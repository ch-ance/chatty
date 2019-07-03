import React from 'react'

import AddFriend from '../AddFriend'

const Settings = ({ history }) => {
    return (
        <div>
            <h2>Settings Screen</h2>
            <AddFriend />
            <GetMyID />
            <button
                onClick={e => {
                    e.preventDefault()
                    history.push('/')
                }}
            >
                Go back home
            </button>
        </div>
    )
}

const GetMyID = () => {
    return (
        <div className="get-id-container">
            <h3>{`Your ID: ${localStorage.getItem('userID')}`}</h3>
        </div>
    )
}

export default Settings
