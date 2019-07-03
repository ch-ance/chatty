import React from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

const LearnMore = ({ history }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem 2rem',
            }}
        >
            <h2>What is Chatty?</h2>
            <p style={{ textAlign: 'left', lineHeight: '1.6rem' }}>
                Chatty is a secure, end-to-end messaging application. While most
                online messaging and SMS services store your messages in a
                database, with Chatty everything is only saved locally on your
                device. This makes it impossible for any third party to access
                any of your conversations. With the regular occurence of hacks
                and data leaks happening at even the most trusted of
                applications, it is becoming increasingly more important to{' '}
                <em>Own Your Own Data.</em>
            </p>
            <p style={{ textAlign: 'left', lineHeight: '1.6rem' }}>
                Ready to get started? Go to the next page for a quick tutorial
                on how to use Chatty. Or, if you're a returning user and would
                just like to make a new account, click on the "Register" button
                below.
            </p>
            <Button style={{ margin: '2rem 0 3rem 0' }} variant="contained">
                Tutorial -->
            </Button>
            <Button
                onClick={e => {
                    e.preventDefault()
                    history.push('/register')
                }}
                variant="contained"
            >
                Register Now
            </Button>
        </div>
    )
}

export default withRouter(LearnMore)
