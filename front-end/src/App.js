import React, { Component, useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'

import db from './db'

import HomeScreen from './components/HomeScreen'
import requiresConnection from './HOCs/requiresConnection'

db.open('contacts')

class App extends Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            loggedIn: false,
            online: false,
        }
    }

    addMessage = message => {
        this.setState(prevState => ({
            messages: [...prevState.messages, message],
        }))
    }

    toggleOnline = () => {
        // only sets to online for now, need to add toggle
        this.setState({
            online: true,
        })
    }

    render() {
        return (
            <div className="App">
                <Route
                    path="/"
                    render={props => (
                        <HomeScreen
                            {...props}
                            ws={this.props.ws}
                            messages={this.state.messages}
                            addMessage={this.addMessage}
                            online={this.state.online}
                            toggleOnline={this.toggleOnline}
                        />
                    )}
                />
            </div>
        )
    }
}

export default withRouter(requiresConnection(App))
