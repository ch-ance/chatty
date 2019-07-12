import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Typography, TextField, Button } from '@material-ui/core'
import TopNav from '../TopNav/'
import axios from 'axios'
import { useStateValue } from '../../state'

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        padding: '1rem .6rem',
    },
    signInText: {
        fontSize: '2rem',
    },
    registerText: {
        marginTop: '1rem',
        fontSize: '1.6rem',
    },
    clickHere: {
        marginTop: '1rem',
        textDecoration: 'underline',
        color: 'white',
    },
}))

// const ThemedButton = () => {
//     const [state, dispatch] = useStateValue()
//             onClick={() =>
//                 dispatch({
//                     type: 'changeTheme',
//                     newTheme: { primary: 'blue' },

const InvitePage = ({ login, history }) => {
    const classes = useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const inviteCode = window.location.pathname.replace('/invite/', '')

    const [{}, dispatch] = useStateValue()

    useEffect(() => {
        dispatch({
            type: 'setInviteCode',
            payload: inviteCode,
        })
        dispatch({
            type: 'toggleAddingContact',
            payload: null,
        })
    }, [inviteCode])

    return (
        <>
            <TopNav />
            <div className={classes.container}>
                <Typography variant="h2" className={classes.signInText}>
                    Sign In
                </Typography>
                <Typography style={{ margin: '.6rem 0' }}>
                    Please login to an existing account
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
                <Typography className={classes.registerText} variant="h3">
                    Not a user?
                </Typography>
                <button
                    style={{ all: 'unset' }}
                    onClick={e => {
                        e.preventDefault()
                        history.push('/register')
                    }}
                >
                    <Typography className={classes.clickHere}>
                        Click <strong>Here</strong> to Register an Account
                    </Typography>
                </button>
            </div>
        </>
    )

    function logIn(event) {
        event.preventDefault()

        axios
            .post(`${process.env.REACT_APP_USERS_DB}/api/auth/login`, {
                username,
                password,
            })
            .then(res => {
                localStorage.setItem('userID', res.data.userID)
                console.log(res.data)
                login(res.data)
                dispatch({
                    type: 'setUser',
                    payload: res.data,
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default withRouter(InvitePage)
