import React, { useState, useEffect } from 'react'

import { useStateValue } from '../../state/'

import db from '../../db'
import {
    TextField,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Button,
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
            <form className={classes.form} onSubmit={addContact}>
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
                <Button variant="outlined" className={classes.addContact}>
                    Add Contact
                </Button>
            </form>
        </>
    )
}

export default AddContact
