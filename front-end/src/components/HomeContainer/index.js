import React from 'react'

import ContactsList from '../ContactsList'
import Settings from '../Settings'
import Chat from '../Chat'
import AddContact from '../AddContact'

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
    contacts,
    contactRequests,
    getContactRequests,
    getContacts,
}) => {
    console.log('PATH: ', path)
    if (path === '/') {
        return (
            <ContactsList
                history={history}
                setFriendID={setFriendID}
                setChattingWith={setChattingWith}
                setView={setView}
                contacts={contacts}
                contactRequests={contactRequests}
                ws={ws}
                getContacts={getContacts}
                getContactRequests={getContactRequests}
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

    return <AddContact />
}

export default HomeContainer
