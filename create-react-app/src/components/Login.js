import React, { useState } from "react";
import axios from "axios";
import baseURL from "../api/url";

const Login = () => {
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
        // setToHomePage(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <header>
        <h1>chatty</h1>
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

export default Login;
