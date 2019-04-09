const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const db = require("../database/dbConfig.js");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's alive!!!!!" });
});

// GET ALL USERS
server.get("/api/users", async (req, res) => {
  try {
    const users = await db("users");
    res.status(200).json(users);
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).json({
      message: "Error retrieving users."
    });
  }
});

// GET SPECIFIC USER BY ID

server.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db("users").where({ id });
    res.status(200).json(user);
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).json({
      message: `Error retrieving user #${id}`
    });
  }
});

// Takes id from params and adds them as a friend to other_user_id
// This should be done twice when a connection is made, once for each user
server.post("/api/users/:id/friends", async (req, res) => {
  const id = req.params.id;
  try {
    const { other_user_id } = req.body;
    await db("friends")
      .insert({
        user_id: id,
        other_user_id
      })
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        console.error("ERROR ADDING FRIENDSHIP:  ", err);
      });
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).json({
      message: "Error adding friendship"
    });
  }
});

// Gets a list of a user's friends
server.get("/api/users/:id/friends", async (req, res) => {
  const id = req.params.id;
  try {
    const userFriends = await db("users")
      .where({ id })
      .join("friends")
      .where("friends.user_id", "=", "users.id");
    res.status(200).json(userFriends);
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500).json({
      message: "Error retrieving friendships."
    });
  }
});

// GET FRIENDS OF USER

// server.get("/api/users/friends/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // const friendships = await db("friendships");
//     // const user = await db("users").where({ id });

//     const userFriends = await db("users AS u")
//       .where({ id })
//       .join("friendships AS f");
//     //   .where("u.id", "=", "f.second_user_id");
//     res.status(200).json(userFriends);
//   } catch (error) {
//     console.error(JSON.stringify(error));
//     res.status(500).json({
//       message: "Error retrieving friendships."
//     });
//   }
// });

// server.get("/api/users/friends/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // const friendships = await db("friendships");
//     // const user = await db("users").where({ id });
//     const userFriends = await db("users")
//       .where({ id })
//       .join("friendships", "friendships.id", "=", "users.id");
//     // .join("friendships", "friendships.first_friend_id", "=", "users.id");
//     res.status(200).json(userFriends);
//   } catch (error) {
//     console.error(JSON.stringify(error));
//     res.status(500).json({
//       message: "Error retrieving friendships."
//     });
//   }
// });

module.exports = server;
