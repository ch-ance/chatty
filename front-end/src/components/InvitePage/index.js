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
        padding: '.7rem .5rem',
    },
    signInText: {
        fontSize: '2rem',
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

                history.push('/addContact')
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default withRouter(InvitePage)
