import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <h2>Login to Chatty</h2>
      <form>
        <span>Username: </span>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Login;
