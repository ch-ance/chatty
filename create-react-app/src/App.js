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
    this.state = { messages: [] };
  }

  // open sockets on mount.
  componentDidMount() {
    socket.on("connection", () => {
      console.log("connecting!");
    });

    socket.on("chat message", msg => {
      this.handleSendMessage(msg.text);
    });
  }

  emitMessageSocket = msg => {
    socket.emit("chat message", msg);
  };

  handleSendMessage = messageText => {
    const message = {
      text: messageText
    };
    db.table("messages")
      .add(message)
      .then(id => {
        const newList = [...this.state.messages, Object.assign({}, message)];
        this.setState({ messages: newList });
      });
    db.table("messages")
      .toArray()
      .then(messages => {
        this.setState({ messages });
      });
  };

  render() {
    return (
      <>
        <main>
          <MessagesHome
            messages={this.state.messages}
            handleSendMessage={this.handleSendMessage}
            emitMessageSocket={this.emitMessageSocket}
          />
        </main>
      </>
    );
  }
}

export default App;
