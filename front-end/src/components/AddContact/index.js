import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useStateValue } from '../../state/'

import {
    TextField,
    FormLabel,
    makeStyles,
    Button,
    Typography,
} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    form: {
        width: '60vw',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
    },
    addContact: {
        marginTop: '1rem',
        backgroundColor: theme.palette.primary.main,
    },
    bottom: {
        width: '90%',
        height: '40vh',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}))

const AddContact = ({ history }) => {
    const classes = useStyles()
    const [state, dispatch] = useStateValue()

    const [contactUsername, setContactUsername] = useState('')

    useEffect(() => {
        if (state.inviteCode) {
            setContactUsername(state.inviteCode)
        }
    }, [state.inviteCode])

    async function addContact(event) {
        event.preventDefault()

        axios
            .post(
                `${
                    process.env.REACT_APP_USERS_DB
                }/api/users/request-add-contact`,
                {
                    first_user: localStorage.getItem('username'),
                    second_user: contactUsername,
                },
            )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })

        // need some error handling for users that already exist, DUH!
    }
    return (
        <>
            <form className={classes.form} onSubmit={e => addContact(e)}>
                <FormLabel>
                    Enter the username of a contact you'd like to add
                </FormLabel>
                <br />
                <TextField
                    variant="filled"
                    value={contactUsername}
                    onChange={e => setContactUsername(e.target.value)}
                />
                <br />

                <Button
                    type="submit"
                    variant="outlined"
                    className={classes.addContact}
                >
                    Add Contact
                </Button>
            </form>
            <div className={classes.bottom}>
                <Typography
                    stye={{
                        margin: '1rem',
                    }}
                >
                    Send this link to a friend to invite them to be your contact
                    on Chatty
                </Typography>
                <div
                    style={{
                        fontSize: '.8rem',
                        width: '100vw',
                        marginTop: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <input
                        value={`${
                            window.location
                        }/invite/${localStorage.getItem('username')}`}
                        readOnly
                        style={{
                            width: '35vw',
                            height: '2rem',
                            borderRadius: '2%',
                            borderWidth: 1,
                            padding: '.2rem',
                        }}
                    />
                    <Button
                        variant="outlined"
                        style={{
                            boxShadow: '5px',
                        }}
                    >
                        Copy <br /> to <br />
                        Clipboard
                    </Button>
                </div>
            </div>
        </>
    )
}

export default withRouter(AddContact)
