import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import { Typography, Modal, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    listItem: {
        border: '2px solid pink',
        borderRadius: '5%',
        cursor: 'pointer',
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

const PendingRequest = ({
    from,
    history,
    setToggle,
    toggle,
    open,
    setOpen,
}) => {
    const classes = useStyles()

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
                New Contact Request From: {from}
            </Typography>
            <Modal
                open={open}
                onClose={e => {
                    e.preventDefault()
                    setOpen(false)
                }}
            >
                <div className={classes.modal}>
                    <Typography variant="h4">
                        {from} would like to add you as a contact. Click "Add"
                        to accept their invitation, or "Decline" otherwise
                    </Typography>
                    <div className={classes.buttonDiv}>
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
                                        setOpen(false)
                                        setToggle(!toggle)
                                    })
                                    .catch(err => {
                                        console.error(err)
                                    })
                            }}
                        >
                            Add
                        </Button>
                        <Button>Decline</Button>
                    </div>
                </div>
            </Modal>
        </ListItem>
    )
}

export default withRouter(PendingRequest)
