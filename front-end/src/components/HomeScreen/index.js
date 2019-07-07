import React, { useState, useEffect } from 'react'
import HomeContainer from '../HomeContainer'
import TopNav from '../TopNav'
import '../../index.scss'

const Context = React.createContext()

const HomeScreen = ({
    ws,
    messages,
    addMessage,
    history,
    toggleOnline,
    online,
    chattingWith,
    setChattingWith,
}) => {
    const [view, setView] = useState('Login')

    useEffect(() => {
        ws.onopen = client => {
            console.log('connected')
        }

        ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            console.log('New Message: ', message)
            addMessage(message)
        }
    }, [addMessage, ws.onmessage, ws.onopen])

    const [friendID, setFriendID] = useState('')

    console.log(history.location.pathname)

    const path = history.location.pathname

    return (
        <Context.Provider value={1}>
            <div className="home-screen">
                <TopNav
                    history={history}
                    online={online}
                    toggleOnline={toggleOnline}
                    ws={ws}
                    view={view}
                />
                <HomeContainer
                    path={path}
                    history={history}
                    messages={messages}
                    friendID={friendID}
                    setFriendID={setFriendID}
                    chattingWith={chattingWith}
                    setChattingWith={setChattingWith}
                    ws={ws}
                    setView={setView}
                />
            </div>
        </Context.Provider>
    )
}

export default HomeScreen
