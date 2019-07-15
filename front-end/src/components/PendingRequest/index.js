import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import { Typography, Modal } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    listItem: {
        border: '1px solid black',
        borderRadius: '5%',
        cursor: 'pointer',
    },
    modal: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        backgroundColor: theme.palette.common.white,
        border: '2px solid black',
        top: '25%',
        left: '25%',
    },
}))

const PendingRequest = ({ from }) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)

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
                <div className={classes.modal} />
            </Modal>
        </ListItem>
    )
}

export default PendingRequest
