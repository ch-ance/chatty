import React, { useState, useEffect } from 'react'

import { useStateValue } from '../../state/'

import db from '../../db'
import {
    TextField,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Button,
    Typography,
} from '@material-ui/core'

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

const AddContact = () => {
    const classes = useStyles()
    const [state, dispatch] = useStateValue()

    const [contactID, setContactID] = useState('')
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        if (state.inviteCode) {
            setContactID(state.inviteCode)
        }
    }, [state.inviteCode])

    async function addContact(event) {
        event.preventDefault()
        console.log('clicking')
        console.log(db.contacts)
        // need some error handling for users that already exist, DUH!
        await db.contacts.add({
            nickname,
            contactID,
            myID: localStorage.getItem('userID'),
        })
    }
    return (
        <>
            <form className={classes.form} onSubmit={e => addContact(e)}>
                <FormLabel>Enter a nickname</FormLabel>
                <br />
                <TextField
                    variant="filled"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
                <br />
                <FormLabel>Contact ID Code</FormLabel>
                <br />
                <TextField
                    variant="filled"
                    value={contactID}
                    onChange={e => setContactID(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    className={classes.addContact}
                >
                    Add Contact
                </Button>
            </form>
            <div className={classes.bottom}>
                <Typography variant="h4">
                    Your Contact ID:{' '}
                    <span
                        style={{
                            backgroundColor: 'blue',
                            border: '5px solid red',
                        }}
                    >
                        {localStorage.getItem('userID')}
                    </span>
                </Typography>
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
                        value={`http://localhost:3000/invite/${localStorage.getItem(
                            'userID',
                        )}`}
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

export default AddContact
