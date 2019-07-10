import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import { useStateValue } from '../../state/'

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
        fontSize: '2.4rem',
        textAlign: 'center',
        margin: '1.4rem 0',
    },
    learnMore: {
        textAlign: 'center',
        margin: '2rem',
    },
}))

const Register = ({ history }) => {
    const [state, dispatch] = useStateValue()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="h1">
                Chatty Registration
            </Typography>
            <form onSubmit={register} className={classes.loginForm}>
                <TextField
                    variant="filled"
                    label="username"
                    className={classes.inputs}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <TextField
                    variant="filled"
                    label="passwprd"
                    className={classes.inputs}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <Button type="submit" variant="contained">
                    Register
                </Button>
            </form>
        </div>
    )

    function register(event) {
        event.preventDefault()

        axios
            .post(`${process.env.REACT_APP_USERS_DB}/api/auth/register`, {
                username,
                password,
            })
            .then(res => {
                history.push('/')
                dispatch({
                    type: 'setUser',
                    payload: res,
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export default withRouter(Register)
