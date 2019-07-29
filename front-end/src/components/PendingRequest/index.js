import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import { Typography, Modal, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useStateValue } from '../../state/'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    listItem: {
        border: '2px solid pink',
        borderRadius: '5%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
    },
    modal: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '50vh',
        height: '50vh',
        backgroundColor: theme.palette.common.white,
        border: '2px solid black',
        top: '25%',
        left: '25%',
    },
    buttonDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
}))

const PendingRequest = ({ from, setOpen, getContacts, getContactRequests }) => {
    const classes = useStyles()

    const [state, dispatch] = useStateValue()

    useEffect(() => {
        console.log(state.ws)
    }, [])

    return (
        <ListItem
            className={classes.listItem}
            alignItems="flex-start"
            onClick={e => {
                e.preventDefault()
                setOpen(true)
            }}
        >
            <Typography variant="h4">
                {from} sent you a contact request.
            </Typography>
            <div>
                <Button
                    onClick={e => {
                        e.preventDefault()
                        axios
                            .post(
                                `${
                                    process.env.REACT_APP_USERS_DB
                                }/api/users/accept-contact`,
                                {
                                    username: from,
                                },
                            )
                            .then(res => {
                                console.log(res)
                                const message = {
                                    type: 'Accepting Contact Request',
                                    acceptingUser: localStorage.getItem(
                                        'username',
                                    ),
                                    requestingUser: from,
                                }
                                state.ws.send(JSON.stringify(message))
                                getContacts()
                                getContactRequests()
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    }}
                >
                    Accept
                </Button>
                <Button>Decline</Button>
            </div>
        </ListItem>
    )
}

export default withRouter(PendingRequest)
