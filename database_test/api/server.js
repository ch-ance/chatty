const express = require( "express" );
const helmet = require( "helmet" );
const cors = require( "cors" );
const server = express();
const knex = require( "knex" );
const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const secret = process.env.JWT_SECRET || "chance halo anthony embrey-farquhar";

// REFACTOR NEEDED: update restricted routes to use authenticate
const { authenticate } = require( "../auth/authenticate" );

const db = require( "../database/dbConfig.js" );

server.use( helmet() );
server.use( express.json() );
server.use( cors() );

server.get( "/", ( req, res ) => {
  res.status( 200 ).json( { message: "It's alive!!!!!" } );
} );

// GET ALL USERS
server.get( "/api/users", async ( req, res ) => {
  try {
    const users = await db( "users" );
    res.status( 200 ).json( users );
  } catch ( error ) {
    console.error( JSON.stringify( error ) );
    res.status( 500 ).json( {
      message: "Error retrieving users."
    } );
  }
} );

// GET SPECIFIC USER BY ID

server.get( "/api/users/:id", async ( req, res ) => {
  try {
    const id = req.params.id;
    const user = await db( "users" ).where( { id } );
    res.status( 200 ).json( user );
  } catch ( error ) {
    console.error( JSON.stringify( error ) );
    res.status( 500 ).json( {
      message: `Error retrieving user #${ id }`
    } );
  }
} );

// Takes id from params and adds other_user_id to their friend's list
// This should be done twice when a friendship is made, once for each user
// Two API calls for now, should refactor later so that this function takes care of both users
server.post( "/api/users/:id/addFriend", async ( req, res ) => {
  const id = req.params.id;
  try {
    const { other_user_id } = req.body;
    await db( "friends" )
      .insert( {
        user_id: id,
        other_user_id
      } )
      .then( id => {
        res.status( 201 ).json( id );
      } )
      .catch( err => {
        console.error( "ERROR ADDING FRIENDSHIP:  ", err );
      } );
  } catch ( error ) {
    console.error( JSON.stringify( error ) );
    res.status( 500 ).json( {
      message: "Error adding friendship"
    } );
  }
} );

// Gets a list of a user's friends
server.get( "/api/users/:id/friends", async ( req, res ) => {
  try {
    const user_id = req.params.id;

    const userFriendsIDs = await db( "friends" )
      .join( "users", "friends.other_user_id", "users.id" )
      .where( "friends.other_user_id", "=", user_id )
      .map( friend => {
        return friend.user_id;
      } );

    const users = await db( "users" );

    const userFriends = users.filter( user => {
      return userFriendsIDs.includes( user.id );
    } );
    res.status( 200 ).json( userFriends );
  } catch ( error ) {
    console.error( JSON.stringify( error ) );
    res.status( 500 ).json( {
      message: "Error retrieving friendships."
    } );
  }
} );

// GET FRIENDS OF USER

// Update socket_id when a user connects
server.put( "/api/users/:id/connect", async ( req, res ) => {
  try {
    const id = req.params.id;
    const { socket_id } = req.body;

    await db( "users" )
      .where( { id } )
      .update( { socket_id } )
      .then( id => {
        res.status( 200 ).json( id );
      } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( "ERROR UPDATING SOCKET ID: ", error );
  }
} );

// REMOVE SOCKET_ID WHEN A USER DISCONNECTS
server.put( "/api/users/:id/disconnect", async ( req, res ) => {
  try {
    const id = req.params.id;

    await db( "users" )
      .where( { id } )
      .update( { socket_id: "" } )
      .then( id => {
        res.status( 200 ).json( id );
      } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( "ERROR UPDATING SOCKET ID: ", error );
  }
} );

// LOGIN AND REGISTER

server.post( "/api/register", ( req, res ) => {
  const { username, password } = req.body;

  if ( !username || !password ) {
    res.status( 400 ).json( {
      message: "Username and password required"
    } );
  }

  const hash = bcrypt.hashSync( password );

  db( "users" )
    .insert( { username, password: hash } )
    .then( ( [ id ] ) => {
      res.status( 201 ).json( {
        username,
        id
      } );
    } )
    .catch( error => {
      res.status( 500 ).json( error );
    } );
} );

server.post( "/api/login", ( req, res ) => {
  const { username, password } = req.body;

  if ( !username || !password ) {
    res.status( 400 ).json( {
      message: "Please provide a username and password"
    } );
  }

  db( "users" )
    .where( { username } )
    .first()
    .then( user => {
      if ( user && bcrypt.compareSync( password, user.password ) ) {
        const token = genToken( user );
        res.status( 200 ).json( {
          message: `Welcome ${ user.username }!`,
          token,
          id: user.id,
          username: user.username
        } );
      } else {
        res.status( 401 ).json( { message: "Invalid credentials" } );
      }
    } )
    .catch( error => {
      res.status( 500 ).json( error );
    } );
} );

const genToken = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign( payload, secret, options );
};

module.exports = server;
