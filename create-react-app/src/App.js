import React, { Component } from "react";
import "./App.css";
import MessagesHome from "./components/MessagesHome";
import db from "./database/db";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

// conditional render based on whether user is logged in
// login screen
// messages screen/contacts => message app screen

class App extends Component {
  constructor() {
    super();
    this.state = { messages: [], friends: [], id: "" };
  }

  // open sockets on mount.
  componentDidMount() {
    socket.on("connect", () => {
      console.log("SOCKET iD: ", socket.id);
      this.setState({ id: socket.id });
    });

    socket.on("chat message", (msg, id) => {
      console.log("RECIEVING MESSAGE: ", msg);
      this.addMessage(msg, id);
      this.updateMessagesDB();
    });

    socket.on("socket id", () => {
      console.log("BROADCASTING ID", socket.id);
    });

    this.updateMessagesDB();
    this.updateFriendsDB();
  }

  emitMessageSocket = msg => {
    console.log("msg");
  };

  addFriend = (e, fr) => {
    e.preventDefault();
    const friend = {
      friendName: fr
    };
    db.table("friends")
      .add(friend)
      .then(id => {
        const newList = [
          ...this.state.friends,
          Object.assign({}, friend, { id })
        ];
        this.setState({ friends: newList });
      });
  };

  updateFriendsDB = () => {
    db.table("friends")
      .toArray()
      .then(friends => {
        this.setState({ friends });
      });
  };

  handleSendMessage = (messageText, socketId) => {
    socket.emit("chat message", messageText, socketId);
    this.addMessage(messageText);
    this.updateMessagesDB();
  };

  // cjamge
  addMessage = messageText => {
    const message = {
      text: messageText
    };
    db.table("messages")
      .add(message)
      .then(id => {
        const newList = [
          ...this.state.messages,
          Object.assign({}, message, { id })
        ];
        this.setState({ messages: newList });
      });
  };

  updateMessagesDB = () => {
    db.table("messages")
      .toArray()
      .then(messages => {
        this.setState({ messages });
      });
  };

  broadcastId = event => {
    event.preventDefault();
    socket.emit("socket id", this.state.id);
  };

  render() {
    return (
      <>
        <main>
          <MessagesHome
            messages={this.state.messages}
            handleSendMessage={this.handleSendMessage}
            emitMessageSocket={this.emitMessageSocket}
            friends={this.state.friends}
            addFriend={this.addFriend}
            broadcastId={this.broadcastId}
          />
        </main>
      </>
    );
  }
}

export default App;
