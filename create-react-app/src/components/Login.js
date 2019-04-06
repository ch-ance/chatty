import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    localStorage.setItem("token", "ayy");
    setUsername("");
    setPassword("");
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
