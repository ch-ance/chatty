import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import db from './db/'

import Loading from './components/Loading/'
import HomeScreen from './components/HomeScreen'
import AddContact from './components/AddContact/'
import requiresConnection from './HOCs/requiresConnection'
import { useStateValue } from './state/'

const App = ({ ws, history }) => {
    const [state, dispatch] = useStateValue()

    useEffect(() => {
        dispatch({
            type: 'setWebSocket',
            payload: ws,
        })
    }, [state.ws])

    useEffect(() => {
        if (state.addingContact && state.user !== null) {
            history.push('/add-contact')
        }
    }, [state.addingContact, state.user])

    const setChattingWith = contact => {
        dispatch({
            type: 'setChattingWith',
            payload: contact,
        })
    }

    useEffect(() => {
        db.table('messages')
            .toArray()
            .then(messages => {
                console.log('MSGS: ', messages)
                dispatch({
                    type: 'getMessages',
                    payload: messages,
                })
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const addMessage = message => {
        const insertion = {
            sendingUser: message.sendingUser,
            receivingUser: message.receivingUser,
            messageText: message.messageText,
        }
        db.table('messages')
            .add(insertion)
            .then(id => {
                console.log('adddddd ed the thing')
                dispatch({
                    type: 'addMessage',
                    payload: message,
                })
            })
    }

    const setView = view => {
        dispatch({
            type: 'setView',
            payload: view,
        })
    }

    return (
        <div className="App">
            <Route
                path="/"
                render={props => (
                    <HomeScreen
                        {...props}
                        ws={ws}
                        messages={state.messages}
                        addMessage={addMessage}
                        chattingWith={state.chattingWith}
                        setChattingWith={setChattingWith}
                        view={state.view}
                        setView={setView}
                    />
                )}
            />
            <Route
                exact
                path="/loading"
                render={props => <Loading {...props} />}
            />
        </div>
    )
}

export default withRouter(requiresConnection(App))
