import React from 'react'

import { useStateValue } from '../../state/'

const AddContact = () => {
    const [state, dispatch] = useStateValue()

    return (
        <>
            <h2>CODE: {state.inviteCode}</h2>
        </>
    )
}

export default AddContact
