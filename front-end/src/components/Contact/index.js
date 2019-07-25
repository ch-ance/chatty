import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import { useStateValue } from '../../state/'

const useStyles = makeStyles(theme => ({
    listItem: {
        width: '100%',
        borderBottom: '1px solid black',
        marginBottom: '.1rem',
        paddingBottom: '.1rem',
    },
}))

const Contact = ({
    contact,
    history,
    setFriendID,
    setChattingWith,
    setView,
}) => {
    const classes = useStyles()

    const statusColor = contact.online ? 'yellow' : 'red'

    const [{ messages }, dispatch] = useStateValue()

    const [lastMessage, setLastMessage] = useState('')

    useEffect(() => {
        const msgs = messages.filter(msg => msg.contact === contact.second_user)
        setLastMessage(msgs[msgs.length - 1])
    }, [messages])

    return (
        <ListItem
            className={classes.listItem}
            alignItems="flex-start"
            onClick={e => {
                e.preventDefault()
                setChattingWith(contact.second_user)
                setView('Chat')
                setFriendID(contact.second_user)
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
                primary={contact.second_user}
                secondary={<>{lastMessage && lastMessage.message}</>}
            />
            <div
                style={{
                    height: '2rem',
                    width: '2rem',
                    backgroundColor: statusColor,
                    borderRadius: '50%',
                }}
            />
        </ListItem>
    )
}

export default Contact
