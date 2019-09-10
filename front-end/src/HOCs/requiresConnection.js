import React, { useEffect } from 'react'

import LearnMore from '../components/LearnMore/LearnMore'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import InvitePage from '../components/InvitePage/'

const url = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3030'

const requiresConnection = Component => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                ws: undefined,
                user: null,
                pointless: 0,
            }
        }

        componentDidUpdate() {
            if (this.state.ws !== undefined && this.state.ws.readyState == 1) {
                const message = {
                    username: localStorage.getItem('username'),
                    identifier: true,
                }
                this.state.ws.send(JSON.stringify(message))
            } else {
            }
        }

        connect = () => {
            const socket = new WebSocket(url)
            socket.addEventListener('open', () => {
                console.log('its open')
                this.setState({
                    ws: socket,
                })
            })
        }

        login = user => {
            this.setState({
                user,
            })
        }

        render() {
            if (!localStorage.getItem('token')) {
                if (window.location.pathname.includes('/invite')) {
                    return <InvitePage login={this.login} />
                }
                if (window.location.pathname === '/learn-more') {
                    return <LearnMore />
                }
                if (window.location.pathname === '/register') {
                    return <Register login={this.login} />
                } else if (window.location.pathname === '/') {
                    return <Login login={this.login} />
                }
            }

            // if websocket is connected, render HomeScreen
            if (this.state.ws !== undefined && this.state.ws.readyState == 1) {
                return (
                    <Component
                        ws={this.state.ws}
                        history={this.props.history}
                    />
                )
            } else {
                console.log('else block requiresConnection')
                return (
                    <Connect
                        connect={this.connect}
                        ws={this.state.ws}
                        props={this.props}
                    />
                )
            }
        }
    }
}

const Connect = ({ connect }) => {
    useEffect(() => {
        connect()
        console.log('in connect')
    }, [connect])

    return (
        <div>
            <h2>Attempting to connect . . .</h2>
        </div>
    )
}

export default requiresConnection
