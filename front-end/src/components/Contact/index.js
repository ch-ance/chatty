import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
}))

const Contact = ({ contact, history, setFriendID }) => {
    const classes = useStyles()

    return (
        <ListItem
            alignItems="flex-start"
            onClick={e => {
                e.preventDefault()
                console.table(contact.contactID)
                setFriendID(contact.contactID)
                history.push('/chat')
            }}
        >
            <ListItemAvatar>
                <Avatar
                    alt={contact.name}
                    src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU0ODQ5MjkxNzkx/jason-bateman-522670-1-402.jpg"
                />
            </ListItemAvatar>
            <ListItemText
                primary={contact.nickname}
                secondary={
                    <>{" — I'll be in your neighborhood doing errands this…"}</>
                }
            />
        </ListItem>
    )
}

export default Contact
