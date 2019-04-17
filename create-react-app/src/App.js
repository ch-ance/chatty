import React, { Component, useState } from "react";
import { Route } from "react-router-dom";
import db from "./database/db";
import axios from "axios";
import baseURL from "./api/url";
import openSocket from "socket.io-client";
import Login from "./components/Login";
import Register from "./components/Register";
import MessageScreen from "./components/MessageScreen";
import MessagesHome from "./components/MessagesHome";

import "./App.scss";

const socket = openSocket("http://localhost:8000");

// conditional render based on whether user is logged in
// login screen
// messages screen/contacts => message app screen

class App extends Component {
  constructor() {
    super();
    this.state = { toggle: true, messages: [], friends: [] };
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
            />
          )}
        />
        <Route
          path="/chat/:friend"
          exact
          render={props => (
            <MessageScreen
              {...props}
              handleSendMessage={this.handleSendMessage}
              messages={this.state.messages}
              getMessages={this.getMessages}
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
    });

    socket.on("chat message", (msg, senderName) => {
      console.log("RECIEVING MESSAGE: " + msg + " FROM: " + senderName);
      this.addMessage(msg, senderName, false);
    });
    this.updateFriends();
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
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

  // Socket.emit parameters are what is being passed to the socket server (duh)
  handleSendMessage = (messageText, friendName) => {
    socket.emit(
      "chat message",
      messageText,
      localStorage.getItem("friend_socket_id"),
      localStorage.getItem("username")
    );
    // .to(localStorage.getItem("friend_socket_id"))

    this.addMessage(messageText, friendName, true);
  };

  addMessage = (text, friendName, isFromUser) => {
    const message = {
      text,
      me: localStorage.getItem("username"),
      friendName,
      isFromUser: true
    };
    db.table("messages")
      .add(message)
      .then(id => {
        const newList = [
          ...this.state.messages,
          Object.assign({}, message, { id })
        ];
        this.getMessages();
      });
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
}

export default App;
