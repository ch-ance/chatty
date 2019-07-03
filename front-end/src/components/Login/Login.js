import React, { useState } from 'react'

import axios from 'axios'
const Login = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registering, setRegistering] = useState(false)

    return (
        <div className="login-page">
            <div className="tab-selector">
                <button
                    className={!registering ? 'activeTab' : ''}
                    onClick={() => setRegistering(false)}
                >
                    Login
                </button>
                <button
                    className={registering ? 'activeTab' : ''}
                    onClick={() => setRegistering(true)}
                >
                    Sign Up
                </button>
            </div>

            <h2>Chatty</h2>
            <form onSubmit={registering ? register : logIn}>
                <span>Username: </span>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <span>Password:</span>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )

    function logIn(event) {
        event.preventDefault()

        axios
            .post(`${process.env.REACT_APP_USERS_DB}/api/auth/login`, {
                username,
                password
            })
            .then(res => {
                localStorage.setItem('userID', res.data.userID)
                login(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    function register(event) {
        event.preventDefault()

        axios
            .post(`${process.env.REACT_APP_USERS_DB}/api/auth/register`, {
                username,
                password
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default Login
