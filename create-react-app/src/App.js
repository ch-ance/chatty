import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import baseURL from "./api/url";
import db from "./database/db";
import Login from "./components/Login";
import Register from "./components/Register";
import MessageScreen from "./components/MessageScreen";
import MessagesHome from "./components/MessagesHome";
import "./App.scss";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

// conditional render based on whether user is logged in
// login screen
// messages screen/contacts => message app screen

class App extends Component {
  constructor() {
    super();
    this.state = { messages: [], friends: [] };
  }

  render() {
    return (
      <div className="container">
        <Route
          path="/"
          exact
          render={props => (
            <Login
              {...props}
              d={console.log}
              friends={this.state.friends}
              messages={this.state.friends}
              updateOnlineStatus={this.updateOnlineStatus}
            />
          )}
        />
        <Route
          path="/register"
          exact
          render={props => <Register {...props} />}
        />
        <Route
          path="/Home"
          exact
          render={props => (
            <MessagesHome
              {...props}
              friends={this.state.friends}
              messages={this.state.friends}
              updateFriends={this.updateFriends}
              updateOnlineStatus={this.updateOnlineStatus}
              addMessage={this.addMessage}
              logout={this.logout}
            />
          )}
        />
        <Route
          path="/chat/:friend"
          exact
          render={props => (
            <MessageScreen
              {...props}
              messages={this.state.messages}
              getMessages={this.getMessages}
              handleSendMessage={this.handleSendMessage}
              updateFriends={this.updateFriends}
            />
          )}
        />
      </div>
    );
  }
  componentDidMount() {
    socket.on("connect", () => {
      console.log("SOCKET iD: ", socket.id);
      localStorage.setItem("socket_id", socket.id);
      this.updateOnlineStatus(socket.id);
      this.updateFriends();
    });

    socket.on("chat message", (msg, senderName) => {
      console.log("RECIEVING MESSAGE: " + msg + " FROM: " + senderName);
      this.addMessage(msg, senderName, false);
    });
    this.updateFriends();
  }

  addMessage = (text, friendName, isFromUser) => {
    const message = {
      text,
      me: localStorage.getItem("username"),
      friendName,
      isFromUser
    };
    db.table("messages")
      .add(message)
      .then(id => {
        // const newList = [
        //   ...this.state.messages,
        //   Object.assign({}, message, { id })
        // ];
        this.getMessages();
      });
  };

  handleSendMessage = (messageText, friendName) => {
    socket.emit(
      "chat message",
      messageText,
      localStorage.getItem("friend_socket_id"),
      localStorage.getItem("username")
    );

    this.addMessage(messageText, friendName, true);
  };

  getMessages = async () => {
    await db
      .table("messages")
      .toArray()
      .then(messages => {
        this.setState({ messages });
      })
      .catch(console.error);
  };

  updateOnlineStatus = socket_id => {
    axios.put(`${baseURL}/api/users/${localStorage.getItem("id")}/connect`, {
      socket_id
    });
  };

  updateFriends = () => {
    axios
      .get(`${baseURL}/api/users/${localStorage.getItem("id")}/friends`)
      .then(res => {
        this.setState({
          friends: res.data
        });
      });
  };

  logout = event => {
    event.preventDefault();
    axios.put(
      `${baseURL}/api/users/${localStorage.getItem("id")}/disconnect`,
      {}
    );
    localStorage.clear();
    this.setState({
      friends: [],
      messages: []
    });
  };
}

export default App;
