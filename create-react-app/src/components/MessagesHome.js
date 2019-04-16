import React, { useState, useEffect, Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import baseURL from '../api/url'

const StyledMessageHomeHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledFriendsUL = styled.ul`
  text-align: right;
  margin-right: 5rem;

  a {
    text-decoration: none;
    font-size: 3rem;
  }
`


const MessagesHome = props => {
	const [ friendName, setFriendName ] = useState( '' )

	if ( localStorage.getItem( 'token' ) == null ) {
		return (
			<Redirect to="/" />
		)
	}

	return (
		<main>
			<button onClick={ logout }>Logout</button>
			<StyledMessageHomeHeader>
				<h2>chatty Homepage...!</h2>
				<h3>Messages:-_-:</h3>
			</StyledMessageHomeHeader>
			<StyledFriendsUL>
				{ props.friends.map( friend => {
					return (
						<Link to={ `/chat/${ friend.username }` }>
							<a>{ friend.username }</a>
						</Link>
					)
				} ) }
			</StyledFriendsUL>
			<div>
				<h3>Add a friend!</h3>
				<form>
					<label htmlFor="friendName" />
					<input
						onChange={ e => setFriendName( e.target.value ) }
						value={ friendName }
					/>
					<button onClick={ addFriend }>Add friend!</button>
				</form>
			</div>
		</main>




	)


	function addFriend ( event ) {
		event.preventDefault()
		console.log( "trying to add " + friendName + " as a friend" )
		axios.post( `${ baseURL }/api/users/${ localStorage.getItem( "id" ) }/addFriend`, {
			friendName
		} ).then( res => {
			console.log( "Friend added!", res )
		} ).catch( err => {
			console.err( "Error adding friend: ", err )
		} )

		setFriendName( '' )
	}
	function logout ( event ) {
		event.preventDefault()
		localStorage.clear()
		setFriendName( "wubalubadubdub!" )
	}
}

export default MessagesHome
