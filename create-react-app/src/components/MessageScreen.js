import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import db from "../database/db";
import MessageBox from "./MessageBox";
import axios from "axios";
import baseURL from "../api/url";

const StyledMessageScreen = styled.div`
  height: 50%;
`;

const MessageScreen = props => {
  const [messageInput, setMessageInput] = useState("");

  const recipientName = window.location.pathname.replace("/chat/", "");

  const sendMessage = event => {
    event.preventDefault();

    props.handleSendMessage(messageInput, recipientName);
    setMessageInput("");
  };

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${baseURL}/api/users/${localStorage.getItem("id")}/friends`)
        .then(res => {
          const friend = res.data.filter(friend => {
            return friend.username === recipientName;
          });
          console.log("FRIEND ID ", friend[0].socket_id);
          localStorage.setItem("friend_socket_id", friend[0].socket_id);
        })
        .catch(err => {
          console.log("COULDN'T GET FRIEND: ", err);
        });
      props.getMessages();
    }, 500);
  }, []);

  return (
    <StyledMessageScreen>
      <Link to="/">Back to home page</Link>
      <button onClick={() => console.log("Click")}>clik</button>
      <h2>you and {recipientName}</h2>
      <form onSubmit={sendMessage}>
        <label htmlFor="Message" />
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
      </form>
      <MessageBox recipientName={recipientName} messages={props.messages} />
    </StyledMessageScreen>
  );
};

export default MessageScreen;
