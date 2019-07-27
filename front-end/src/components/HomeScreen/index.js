import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

    const [contacts, setContacts] = useState([])

    const [contactRequests, setContactRequests] = useState([])

    // a toggle function to re-fetch contacts after accepting a request
    const [toggle, setToggle] = useState(false)

    const [gettingMessage, setGettingMessage] = useState(false)

    function getContacts() {
        axios
            .get(
                `${
                    process.env.REACT_APP_USERS_DB
                }/api/users/${localStorage.getItem('username')}/contacts`,
            )
            .then(res => {
                setContacts(
                    res.data.map(contact => {
                        return {
                            ...contact,
                            online: false,
                        }
                    }),
                )
                const message = {
                    statusCheck: true,
                    me: localStorage.getItem('username'),
                    online: true,
                    contactIDs: contacts.map(contact => {
                        return contact.second_user
                    }),
                }
                ws.send(JSON.stringify(message))
            })
            .catch(err => {
                console.error(err)
            })
        // window.onbeforeunload = () => {
        //     const message = {
        //         me: localStorage.getItem('username'),
        //         statusCheck: true,
        //         online: false,
        //         contactIDs: contacts.map(contact => {
        //             return contact.second_user
        //         }),
        //     }
        //     ws.send(JSON.stringify(message))
        // }
    }

    function getContactRequests() {
        axios
            .get(
                `${
                    process.env.REACT_APP_USERS_DB
                }/api/users/${localStorage.getItem(
                    'username',
                )}/pending-contacts`,
            )
            .then(res => {
                setContactRequests(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        getContacts()
        getContactRequests()
    }, [toggle])

    useEffect(() => {
        ws.onopen = client => {
            console.log('connected')
        }

        ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            if (message.type === 'Private Message') {
                console.log('New Message: ', message)
                addMessage(message)
            } else if (message.updatingOnlineStatus) {
                const onlineContacts = message.onlineContacts
                setContacts(
                    contacts.map(contact => {
                        if (onlineContacts.includes(contact.second_user)) {
                            return {
                                ...contact,
                                online: true,
                            }
                        } else return contact
                    }),
                )
            } else if (message.contactRequestAccepted) {
                console.log('IT FUCKED ACCEPTED IT!!!!!')
                console.table('MSSSSSSSGGGGG: ', message)
            } else if (message.userIsOnline) {
                console.log(`${message.user} is now online!`)
                setContacts(
                    contacts.map(contact => {
                        if (contact.second_user === message.user) {
                            return {
                                ...contact,
                                online: true,
                            }
                        } else return contact
                    }),
                )
            }
        }
    }, [ws.onopen])

    useEffect(() => {
        console.log(ws)
    }, [ws])

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
                    chattingWith={chattingWith}
                />
                <HomeContainer
                    path={path}
                    history={history}
                    messages={messages}
                    addMessage={addMessage}
                    friendID={friendID}
                    setFriendID={setFriendID}
                    chattingWith={chattingWith}
                    setChattingWith={setChattingWith}
                    ws={ws}
                    setView={setView}
                    contacts={contacts}
                    contactRequests={contactRequests}
                />
            </div>
        </Context.Provider>
    )
}

export default HomeScreen
