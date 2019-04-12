import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/url";

const Login = ({ toggle }) => {
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
        toggle();
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
    </div>
  );
};

export default Login;
