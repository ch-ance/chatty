import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Loading = ({ history }, condition = true) => {
    const destination = window.location.pathname
    useEffect(() => {
        if (condition) {
            history.push(destination)
        }
    }, [])

    return (
        <>
            <h2>Loading . . . </h2>
        </>
    )
}

export default withRouter(Loading)
