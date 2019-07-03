import React, { useState, useEffect } from 'react'

import Contact from '../Contact'

import db from '../../db'

const ContactsList = ({ history, setFriendID }) => {
    const [contacts, setContacts] = useState([])

    async function getContacts() {
        await db
            .table('contacts')
            .where('myID')
            .equals(localStorage.getItem('userID'))
            .toArray()
            .then(contacts => {
                setContacts(contacts)
            })
            .catch(console.error)
    }

    useEffect(() => {
        getContacts()
    }, [contacts])

    return (
        <ul>
            {contacts.map(contact => {
                return (
                    <Contact
                        contact={contact}
                        history={history}
                        setFriendID={setFriendID}
                    />
                )
            })}
        </ul>
    )
}

export default ContactsList
