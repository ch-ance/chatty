import React, { Component, useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";

import requiresConnection from "./HOCs/requiresConnection";

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
        <Route
          path="/"
          render={props => (
            <HomeScreen
              {...props}
              ws={this.props.ws}
              messages={this.state.messages}
              addMessage={this.addMessage}
            />
          )}
        />
      </div>
    );
  }
}

const HomeScreen = ({ ws, messages, addMessage, history }) => {
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

  const [friendID, setFriendID] = useState(0);

  /// RANDOM USER ID CODE BELOW

  return (
    <div>
      <h1>HomeScreen</h1>
      <br />
      <br />
      <span>friend ID: </span>
      <input
        type="text"
        value={friendID}
        onChange={e => setFriendID(e.target.value)}
      />{" "}
      <span>{friendID}</span>
      <br />
      <br />
      <br />
      <Chat ws={ws} messages={messages} friendID={friendID} />
    </div>
  );
};

const Chat = ({ ws, messages, friendID }) => {
  function sendMessage(event) {
    event.preventDefault();
    const message = {
      pm: true,
      friendID,
      name: "Chance",
      message: messageText
    };
    ws.send(JSON.stringify(message));
    // need to stringify for WebSocket server to accept and read it
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
      <ul>
        {messages.map(message => {
          return <li>{message.message}</li>;
        })}
      </ul>
    </div>
  );
};

export default withRouter(requiresConnection(App));
