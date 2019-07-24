import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'

import Contact from '../Contact'
import PendingRequest from '../PendingRequest/'

import { useStateValue } from '../../state/'

import { Button, Typography } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    noContacts: {
        width: '100vw',
        padding: '2rem',
    },
}))

const ContactsList = ({
    history,
    setChattingWith,
    setFriendID,
    setView,
    contacts,
    contactRequests,
}) => {
    const [{ ws }, dispatch] = useStateValue()

    const classes = useStyles()

    const [open, setOpen] = useState(false)

    const [toggle, setToggle] = useState(false)

    return (
        <div
            onClick={e => {
                console.log(
                    'clicking where it should close the modal. Hopefully OUTSIDE of the modal itself',
                )
                e.preventDefault()
                if (open === true) {
                    setOpen(false)
                }
            }}
        >
            {contacts.length === 0 && (
                <div className={classes.noContacts}>
                    <Typography>
                        New to chatty? Click on the PLUS button in the top left
                        corner to add a new contact
                    </Typography>
                </div>
            )}
            {contactRequests.map(request => {
                return (
                    <PendingRequest
                        open={open}
                        setOpen={setOpen}
                        from={request.first_user}
                        toggle={toggle}
                        setToggle={setToggle}
                    />
                )
            })}
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
        </div>
    )
}

export default ContactsList
