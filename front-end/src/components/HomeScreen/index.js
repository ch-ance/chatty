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
            })
            .catch(err => {
                console.error(err)
            })
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
            if (message.pm) {
                console.log('New Message: ', message)
                addMessage(message)
            } else if (message.updatingOnlineStatus) {
                const onlineContacts = message.onlineContacts
                setContacts(
                    contacts.map(contact => {
                        console.log('CONTACT MAPPPING: ', contact)
                        console.log(onlineContacts)
                        console.log('Contact: ', contact.second_user)
                        if (onlineContacts.includes(contact.second_user)) {
                            console.log('HYESSSS!')

                            return {
                                ...contact,
                                online: true,
                            }
                        } else return contact
                    }),
                )
                console.log('Contacts: ', contacts)
            }
        }
    }, [addMessage, ws.onopen])

    useEffect(() => {
        setTimeout(() => {
            console.log(ws)
            const message = {
                statusCheck: true,
                me: localStorage.getItem('username'),
                contactIDs: contacts.map(contact => {
                    return contact.second_user
                }),
            }
            ws.send(JSON.stringify(message))
        }, 1000)

        // const message = {
        //     statusCheck: true,
        //     me: localStorage.getItem('username'),
        //     contactIDs: contacts.map(contact => {
        //         return contact.username
        //     }),
        // }
        // ws.send(JSON.stringify(message))
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
