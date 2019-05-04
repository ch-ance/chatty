import React, { Component, useEffect, useState } from "react";
import { Route } from "react-router-dom";

import requiresConnection from "./HOCs/requiresConnection";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  addMessage = message => {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));
  };

  render() {
    return (
      <div className="App">
        <HomeScreen
          ws={this.props.ws}
          messages={this.state.messages}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}

const HomeScreen = ({ ws, messages, addMessage }) => {
  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      console.log("New Message: ", message);
      addMessage(message);
    };
  }, []);

  const [user_id, setUserId] = useState(0);

  function getID() {
    setUserId(Math.floor(Math.random() * 100));
  }
  return (
    <div>
      <h1>HomeScreen</h1>
      <Chat ws={ws} messages={messages} />
      <button onClick={getID}>Get my ID</button>
      <div>My unique id is: {user_id}</div>
    </div>
  );
};

const Chat = ({ ws, messages }) => {
  function sendMessage(event) {
    event.preventDefault();
    const message = { name: "Chance", message: messageText };
    ws.send(JSON.stringify(message));
    setMessageText("");
  }

  const [messageText, setMessageText] = useState("");

  const [friendID, setFriendID] = useState(0);

  return (
    <div>
      <form onSubmit={sendMessage}>
        <h3>Recipient ID: </h3>
        <input
          type="text"
          value={friendID}
          onChange={e => setFriendID(e.target.value)}
        />
        <input
          type="text"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
        />

        <button>Send message</button>
      </form>
      <ul>
        {messages.map(message => {
          return <li>{message.message}</li>;
        })}
      </ul>
    </div>
  );
};

export default requiresConnection(App);
