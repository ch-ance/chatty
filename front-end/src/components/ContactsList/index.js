import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'

import Contact from '../Contact'
import PendingRequest from '../PendingRequest/'

import { Button, Typography } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    noContacts: {
        width: '100vw',
        padding: '2rem',
    },
}))

const ContactsList = ({ history, setChattingWith, setFriendID, setView }) => {
    const classes = useStyles()

    const [contacts, setContacts] = useState([])

    const [contactRequests, setContactRequests] = useState([])

    // a toggle function to re-fetch contacts after accepting a request
    const [toggle, setToggle] = useState(false)

    function getContacts() {
        axios
            .get(
                `${
                    process.env.REACT_APP_USERS_DB
                }/api/users/${localStorage.getItem('username')}/contacts`,
            )
            .then(res => {
                setContacts(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    function getContactRequests() {
        axios
            .get(
                `${
                    process.env.REACT_APP_USERS_DB
                }/api/users/${localStorage.getItem(
                    'username',
                )}/pending-contacts`,
            )
            .then(res => {
                setContactRequests(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        getContacts()
        getContactRequests()
    }, [toggle])

    // useEffect(() => {
    //     getContactRequests()
    // }, [contactRequests])

    return (
        <>
            {contacts.length === 0 && (
                <div className={classes.noContacts}>
                    <Typography>
                        New to chatty? Click on the PLUS button in the top left
                        corner to add a new contact
                    </Typography>
                </div>
            )}
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
            {contactRequests.map(request => {
                return (
                    <PendingRequest
                        from={request.first_user}
                        toggle={toggle}
                        setToggle={setToggle}
                    />
                )
            })}
        </>
    )
}

export default ContactsList
