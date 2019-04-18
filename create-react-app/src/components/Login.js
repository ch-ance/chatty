import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/url";

import "./login.scss";

const Login = ({ updateOnlineStatus }) => {
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
        // setting state to trigger rerender. Bad?
        setUsername("wubalubadubdub!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/Home" />;
  }

  return (
    <div className="loginPage">
      <header className="homePageHeader">
        <h1>Chatty</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="credentialsBox">
            <div className="credentials">
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="credentials">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <Link to="/register" className="registerText">
          <h3>Not Registered? Click here to learn more.</h3>
        </Link>
      </section>
    </div>
  );
};

export default Login;
