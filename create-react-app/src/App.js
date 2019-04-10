import React, { Component, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "./api/url";
import MessageScreen from "./components/MessageScreen";
import MessagesHome from "./components/MessagesHome";
// conditional render based on whether user is logged in
// login screen
// messages screen/contacts => message app screen

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: false };
  }

  toggleLoggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  render() {
    return (
      <>
        {this.state.loggedIn ? (
          <MessagesHome toggleLoggedIn={this.toggleLoggedIn} />
        ) : (
          <Login toggleLoggedIn={this.toggleLoggedIn} />
        )}
        <Route path="/alice" component={MessageScreen} />
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

  // const [toHomePage, setToHomePage] = useState(false);

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
        axios.put(`${baseURL}/api/${res.data.id}/connect`, {
          socket_id: localStorage.getItem("socket_id")
        });
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
