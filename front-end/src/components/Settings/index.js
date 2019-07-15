import React from 'react'

import AddFriend from '../AddFriend'

const Settings = ({ history }) => {
    return (
        <div>
            <h2>Settings Screen</h2>
            <AddFriend />
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

export default Settings
