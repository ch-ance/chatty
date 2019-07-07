import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
    sentMessage: {
        marginLeft: '5rem',
        marginRight: '1rem',
        borderRadius: '2%',
        marginBottom: '1rem',
        padding: '.4rem',
        letterSpacing: '.1rem',
    },
    receivedMessage: {
        marginRight: '5rem',
        marginLeft: '1rem',
        borderRadius: '2%',
        marginBottom: '1rem',
        padding: '.4rem',
        letterSpacing: '.1rem',
        backgroundColor: theme.palette.primary.main,
    },
    // text input field
    root: {
        background: theme.palette.common.white,
        borderRadius: '2%',
        width: '75vw',
    },
}))

const Chat = ({ ws, messages, addMessage, friendID, chattingWith }) => {
    const classes = useStyles()

    console.log('CHATTING WITH: ', chattingWith)

    return (
        <div
            style={{
                backgroundColor: '#E0E0E0',
            }}
        >
            <div
                style={{
                    height: '84vh',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
            >
                {messages.reverse().map(message => {
                    return message.sent ? (
                        <UserChatBox message={message} />
                    ) : (
                        <ContactChatBox message={message} />
                    )
                })}
            </div>
            <InputBox ws={ws} addMessage={addMessage} />
        </div>
    )

    function InputBox({ ws, addMessage }) {
        const [messageText, setMessageText] = useState('')

        return (
            <div
                style={{
                    position: 'relative',
                    bottom: 0,
                    height: '8vh',
                }}
            >
                <form
                    style={{
                        position: 'sticky',
                        bottom: 0,
                    }}
                    onSubmit={sendMessage}
                >
                    {/* <input
                type="text"
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
            /> */}
                    <TextField
                        value={messageText}
                        onChange={e => setMessageText(e.target.value)}
                        className={classes.root}
                        variant="outlined"
                    />

                    <button
                        style={{
                            all: 'unset',
                            height: '2.4rem',
                            width: '2.4rem',
                            marginLeft: '.4rem',
                        }}
                    >
                        <FontAwesomeIcon
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                            icon={faPaperPlane}
                        />
                    </button>
                </form>
            </div>
        )

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
            if (message.sent) {
                addMessage(message)
            }
            // need to stringify for WebSocket server to accept and read it
            setMessageText('')
        }
    }

    function UserChatBox({ message }) {
        const classes = useStyles()

        return <Paper className={classes.sentMessage}>{message.message}</Paper>
    }

    function ContactChatBox({ message }) {
        const classes = useStyles()

        return (
            <Paper className={classes.receivedMessage}>{message.message}</Paper>
        )
    }
}

export default Chat
