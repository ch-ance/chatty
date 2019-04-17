import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/url";
import "./register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${baseURL}/api/register`, {
        username,
        password
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    // set state to rerender. Bad??
    setUsername("wubadubadubdub!");
  };
  if (localStorage.getItem("token")) {
    return <Redirect to="/Home" />;
  }
  return (
    <div className="registerPage">
      <section>
        <div className="headerText">
          <h2>
            Chatty is an end-to-end messaging application. None of your messages
            are ever saved on a server; You and your recipient are in complete
            control of the messages you send.
          </h2>
        </div>
        <div className="subHeaderText">
          <h3>
            To sign up, just create a username and password below. We'll never
            ask for any other information from you.
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
