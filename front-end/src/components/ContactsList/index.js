import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

import Contact from '../Contact'

import db from '../../db'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const ContactsList = ({ history, setChattingWith, setFriendID, setView }) => {
    const classes = useStyles()

    const [contacts, setContacts] = useState([])

    async function getContacts() {
        await db
            .table('contacts')
            .where('myID')
            .equals(localStorage.getItem('userID'))
            .toArray()
            .then(contacts => {
                setContacts(contacts)
            })
            .catch(console.error)
    }

    useEffect(() => {
        getContacts()
    }, [contacts])

    return (
        <List className={classes.root}>
            {contacts.map(contact => {
                return (
                    <Contact
                        contact={contact}
                        history={history}
                        setChattingWith={setChattingWith}
                        setFriendID={setFriendID}
                        setView={setView}
                    />
                )
            })}
            {/* <Divider variant="inset" component="li" /> */}
        </List>
    )
}

export default ContactsList
