import React, { Component, useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";

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

  return (
    <div>
      <h1>HomeScreen</h1>
      <h3>Recipient ID: </h3>
      <input
        type="text"
        value={friendID}
        onChange={e => setFriendID(e.target.value)}
      />{" "}
      <span>{friendID}</span>
      <Chat ws={ws} messages={messages} friendID={friendID} />
      <button>Get my ID</button>
      <div>My unique id is:</div>
    </div>
  );
};

const Chat = ({ ws, messages, friendID }) => {
  function sendMessage(event) {
    event.preventDefault();
    const message = { name: "Chance", message: messageText, friendID };
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
      <ul>
        {messages.map(message => {
          return <li>{message.message}</li>;
        })}
      </ul>
    </div>
  );
};

export default withRouter(requiresConnection(App));
