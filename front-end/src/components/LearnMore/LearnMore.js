import React from 'react'

const LearnMore = () => {
    return (
        <div style={{ textAlign: 'center', margin: '1rem 2rem' }}>
            <h2>What is Chatty?</h2>
            <p style={{ textAlign: 'left' }}>
                Chatty is a secure, end-to-end messaging application. While most
                online messaging and SMS services store your messages in a
                database, with Chatty everything is only saved locally on your
                device. This makes it impossible for any third party to access
                any of your conversations. With the regular occurence of hacks
                and data leaks happening at even the most trusted of
                applications, it is becoming increasingly more important to{' '}
                <em>Own Your Own Data.</em>
            </p>
            <h4>
                Ready to get started? Go to the next page for a quick tutorial
                on how to use Chatty. Or, if you're a returning user and would
                just like to make a new account, click on the "Register" button
                below
            </h4>
        </div>
    )
}

export default LearnMore
