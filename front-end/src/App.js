import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'

import db from './db'
import Loading from './components/Loading/'
import HomeScreen from './components/HomeScreen'
import AddContact from './components/AddContact/'
import requiresConnection from './HOCs/requiresConnection'
import { useStateValue } from './state/'

db.open('contacts')

const App = ({ ws, history }) => {
    // const state = {
    //     messages: [],
    //     loggedIn: false,
    //     online: false,
    //     chattingWith: null,
    //     view: 'Login',
    //     addingContact: false,
    // }

    const [state, dispatch] = useStateValue()

    const setAddingContact = () => {
        // this.setState(prevState => ({
        // ...prevState,
        // addingContact: true,
        // }))
    }

    useEffect(() => {
        if (state.addingContact && state.user !== null) {
            history.push('/add-contact')
        }
    }, [state.addingContact, state.user])

    // setView = view => {
    //     this.setState(prevState => ({
    //         ...prevState,
    //         view,
    //     }))
    // }

    const setChattingWith = contact => {
        dispatch({
            type: 'setChattingWith',
            payload: contact,
        })
    }

    const addMessage = message => {
        dispatch({
            type: 'addMessage',
            payload: message,
        })
    }

    const setView = view => {
        dispatch({
            type: 'setView',
            payload: view,
        })
    }

    // toggleOnline = () => {
    //     // only sets to online for now, need to add toggle
    //     this.setState({
    //         online: true,
    //     })
    // }

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
                        // online={this.state.online}
                        // toggleOnline={this.toggleOnline}
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
