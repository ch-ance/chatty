import React, { Component } from "react";
import db from "../database/db";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

class MessagesHome extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], friends: [], socket_id: "", homePage: null };
  }

  render() {
    return (
      <>
        <main>
          <button onClick={this.logout}>Logout</button>
          <h2>chatty Homepage...!</h2>
        </main>
      </>
    );
  }

  logout = event => {
    event.preventDefault();
    localStorage.clear();
    this.props.toggleLoggedIn();
  };

  // open sockets on mount.
  componentDidMount() {
    socket.on("connect", () => {
      console.log("SOCKET iD: ", socket.id);
      localStorage.setItem("socket_id", socket.id);
    });

    socket.on("chat message", (msg, id) => {
      console.log("RECIEVING MESSAGE: ", msg);
      this.addMessage(msg, id);
      this.updateMessagesDB();
    });

    this.updateMessagesDB();
    this.updateFriendsDB();
  }

  addFriend = (e, friendName) => {
    e.preventDefault();
    const friend = {
      friendName
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
}

export default MessagesHome;
