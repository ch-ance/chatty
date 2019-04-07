import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Dexie from "dexie";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

const StyledMessages = styled.div`
  background-color: red;
  height: 70vh;
  width: 100vw;
  max-width: 100%;
`;

const UserMessage = styled.li`
  text-align: right;
  color: white;
`;

const OtherMessage = styled.li`
  text-align: left;
  color: blue;
`;

const MessageScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // indexedDB on mount
  useEffect(() => {
    const db = new Dexie("db");
    db.version(1).stores({ messages: "" });
    socket.on("connection", () => {
      console.log("connecting");
    });

    socket.on("chat message", msg => {
      db.table("messages")
        .add({ messages: msg })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    });
  }, []);

  const getMessages = () => {
    db.table("messages")
      .toArray()
      .then(setMessages);
  };

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("chat message", message);

    setMessage("");
    getMessages();
  };

  const recipientName = window.location.pathname;
  return (
    <>
      <h2>
        you and
        {//gets rid of the '/' from the route
        recipientName
          .split("")
          .splice(1)
          .reverse()
          .concat(" ")
          .reverse()
          .join("")}
      </h2>
      <StyledMessages>
        <ul>
          {messages.map(msg => {
            return <li>{msg.messages}</li>;
          })}
        </ul>
      </StyledMessages>
      <form onSubmit={sendMessage}>
        <label htmlFor="Message" />
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </form>
    </>
  );
};

export default MessageScreen;
