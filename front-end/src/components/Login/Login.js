import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
    },
    inputs: {
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '50vw',
        margin: '5%',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        fontSize: '3rem',
        textAlign: 'center',
        margin: '1.4rem 0',
        letterSpacing: '.2rem',
    },
    learnMore: {
        textAlign: 'center',
        margin: '2rem',
        fontWeight: 'bold',
        // color: 'white',
        textDecoration: 'underline',
    },
}))

const Login = ({ login, history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="h1">
                Chatty
            </Typography>
            <form onSubmit={logIn} className={classes.loginForm}>
                <TextField
                    variant="filled"
                    label="username"
                    className={classes.inputs}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <TextField
                    variant="filled"
                    label="password"
                    className={classes.inputs}
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <Button type="submit" variant="contained">
                    Log In
                </Button>
            </form>
            <button
                onClick={e => {
                    e.preventDefault()
                    history.push('/register')
                }}
                style={{ all: 'unset' }}
            >
                <Typography variant="h6" className={classes.learnMore}>
                    New to Chatty? Click here to create an account
                </Typography>
            </button>
        </div>
    )

    function logIn(event) {
        event.preventDefault()

        axios
            .post(`${process.env.REACT_APP_USERS_DB}/api/auth/login`, {
                username,
                password,
            })
            .then(res => {
                localStorage.setItem('username', username)
                localStorage.setItem('token', res.data.token)
                console.log(res.data)
                login(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default withRouter(Login)
