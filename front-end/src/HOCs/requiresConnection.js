import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import LearnMore from '../components/LearnMore/LearnMore'
import Register from '../components/Register/Register'
import Login from '../components/Login/Login'
import InvitePage from '../components/InvitePage/'
import AddContact from '../components/AddContact/'

// DEV
// import axios from 'axios'

const url = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3030'
// const url = 'ws://localhost:1234'

const requiresConnection = Component =>
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                ws: undefined,
                user: null,
            }
        }
        // const  = props.
        connect = () => {
            this.setState({
                ws: new WebSocket(url),
            })
            setTimeout(() => {
                const message = {
                    userID: localStorage.getItem('userID'),
                    identifier: true,
                }
                this.state.ws.send(JSON.stringify(message))
            }, 1500)
        }

        login = (user, invite = false) => {
            this.setState({
                user,
            })
        }

        // DEVELOPMENT::
        //      Logs in User automatically to get past auth screen

        // componentDidMount() {
        //     axios
        //         .post(`${process.env.REACT_APP_USERS_DB}/api/auth/login`, {
        //             username: 'username',
        //             password: 'password',
        //         })
        //         .then(res => {
        //             localStorage.setItem('userID', res.data.userID)
        //             console.log(res.data)
        //             this.setState(prevState => ({
        //                 ...prevState,
        //                 user: res.data,
        //             }))
        //         })
        //         .catch(err => {
        //             console.error(err)
        //         })
        // }

        render() {
            // if user is not logged in, render Login page

            // DEVELOPMENT:
            // Hardcoding user login data

            // Link from an existing user to join Chatty

            if (this.state.user === null) {
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
            if (this.state.ws !== undefined) {
                return <Component ws={this.state.ws} />
            } else {
                console.log('elseBLOCKSFSDFSDFSD')
                return (
                    <Connect
                        connect={this.connect}
                        ws={this.state.ws}
                        props={this.props}
                        // destination={this.state.destination}
                    />
                )
            }
        }
    }

const Connect = ({ connect, ws }) => {
    useEffect(() => {
        console.log('in connect')
        connect()
    }, [connect])

    return (
        <div>
            <h2>Attempting to connect . . .</h2>
        </div>
    )
}

export default requiresConnection
