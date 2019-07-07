import React, { useState } from 'react'

import ContactsList from '../ContactsList'
import Settings from '../Settings'
import Chat from '../Chat'

const HomeContainer = ({
    history,
    path,
    messages,
    addMessage,
    friendID,
    setFriendID,
    chattingWith,
    setChattingWith,
    setView,
    ws,
}) => {
    console.log('PATH: ', path)
    if (path === '/') {
        return (
            <ContactsList
                history={history}
                setFriendID={setFriendID}
                setChattingWith={setChattingWith}
                setView={setView}
            />
        )
    }

    if (path === '/settings') {
        return <Settings history={history} />
    }

    if (path === '/chat') {
        return (
            <Chat
                friendID={friendID}
                messages={messages}
                ws={ws}
                chattingWith={chattingWith}
                addMessage={addMessage}
            />
        )
    }

    return <h2>Uh something is wrong</h2>
}

export default HomeContainer
