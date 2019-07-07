import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    sentMessage: {
        // display: 'inline',
        marginRight: '1rem',
        borderRadius: '2%',
        marginBottom: '1rem',
    },
}))

const Chat = ({ ws, messages, friendID, chattingWith }) => {
    function sendMessage(event) {
        event.preventDefault()
        const message = {
            pm: true,
            friendID,
            contact: 'Chance',
            sent: true,
            message: messageText,
        }
        ws.send(JSON.stringify(message))
        // need to stringify for WebSocket server to accept and read it
        setMessageText('')
    }

    const [messageText, setMessageText] = useState('')
    console.log('CHATTING WITH: ', chattingWith)

    return (
        <div
            style={{
                backgroundColor: '#E0E0E0',
            }}
        >
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                />

                <button>Send message</button>
            </form>
            <ul
                style={{
                    listStyle: 'none',
                }}
            >
                {messages.map(message => {
                    return (
                        <li>
                            <UserChatBox message={message} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )

    function UserChatBox({ message }) {
        const classes = useStyles()
        return <Paper className={classes.sentMessage}>{message.message}</Paper>
    }
}

export default Chat
