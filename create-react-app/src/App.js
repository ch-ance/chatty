import React, { Component, useState } from "react";
import { Route } from "react-router-dom";
import db from "./database/db";
import axios from "axios";
import baseURL from "./api/url";
import openSocket from "socket.io-client";
import MessageScreen from "./components/MessageScreen";
import MessagesHome from "./components/MessagesHome";

const socket = openSocket("http://localhost:8000");

// conditional render based on whether user is logged in
// login screen
// messages screen/contacts => message app screen

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false, messages: [], friends: [] };
  }

  componentDidMount() {
    socket.on("connect", () => {
      console.log("SOCKET iD: ", socket.id);
      localStorage.setItem("socket_id", socket.id);
      this.updateOnlineStatus(socket.id);
    });

    socket.on("chat message", (msg, senderName) => {
      console.log("RECIEVING MESSAGE: " + msg + " FROM: " + senderName);
      this.addMessage(msg, senderName);
    });

    this.updateFriends();
  }

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

  toggleLoggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn, messages: [] });
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

    // this.addMessage(messageText, friendName);
  };

  addMessage = (messageText, senderName) => {
    const message = {
      text: messageText,
      me: localStorage.getItem("username"),
      senderName: senderName
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

  render() {
    return (
      <>
        {this.state.loggedIn ? (
          <MessagesHome
            toggleLoggedIn={this.toggleLoggedIn}
            friends={this.state.friends}
          />
        ) : (
          <Login toggleLoggedIn={this.toggleLoggedIn} />
        )}
        <Route
          path="/test"
          exact
          render={props => (
            <MessageScreen
              {...props}
              handleSendMessage={this.handleSendMessage}
              messages={this.state.messages}
            />
          )}
        />
        <Route
          path="/:friend"
          exact
          render={props => (
            <MessageScreen
              {...props}
              handleSendMessage={this.handleSendMessage}
              messages={this.state.messages}
            />
          )}
        />
      </>
    );
  }
}

const Login = ({ toggleLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${baseURL}/api/login`, {
        username,
        password
      })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("username", res.data.username);
        axios.put(`${baseURL}/api/${res.data.id}/connect`, {
          socket_id: localStorage.getItem("socket_id")
        });
        localStorage.setItem("loggedIn", true);
        toggleLoggedIn();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <header>
        <h1>chatty login</h1>
      </header>
      <section>
        <h2>Have an account? Log in below!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default App;
