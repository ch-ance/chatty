import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/url";

const Register = ({ toggle }) => {
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
  };
  if (localStorage.getItem("token")) {
    return <Redirect to="/Home" />;
  }
  return (
    <div className="registerPage">
      <header className="registerPageHeader">
        <h1>chatty login</h1>
      </header>
      <section>
        <h2>
          Welcome to chattyApp! Simply enter a unique username and password
          below and click 'Register' to get started!
        </h2>
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
            <button type="submit">Register</button>
          </div>
        </form>
        <Link to="/">
          <button>Click here to go login</button>
        </Link>
      </section>
    </div>
  );
};

export default Register;
