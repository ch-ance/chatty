import React, { Component, useEffect, useState } from "react";
import { Route } from "react-router-dom";

import requiresConnection from "./HOCs/requiresConnection";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeScreen ws={this.props.ws} />
      </div>
    );
  }
}

const HomeScreen = ({ ws }) => {
  console.log(ws);

  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      console.log("New Message: ", message);
    };
  }, []);
  return (
    <div>
      <h1>HomeScreen</h1>
      <Chat ws={ws} />
    </div>
  );
};

const Chat = ({ ws }) => {
  function sendMessage(event) {
    event.preventDefault();
    const message = { name: "Chance", message: messageText };
    ws.send(JSON.stringify(message));
    setMessageText("");
  }

  const [messageText, setMessageText] = useState("");

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
        />
        <button>Send message</button>
      </form>
    </div>
  );
};

export default requiresConnection(App);
