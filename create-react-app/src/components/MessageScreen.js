import React, { useState, useEffect } from "react";
import db from "../database/db";
import MessageBox from "./MessageBox";
import axios from "axios";
import baseURL from "../api/url";

// const UserMessage = styled.li`
//   text-align: right;
//   color: white;
// `;

// const OtherMessage = styled.li`
//   text-align: left;
//   color: blue;
// `;

const MessageScreen = props => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const recipientName = window.location.pathname.replace("/", "");

  const getMessages = () => {
    const messages = db
      .table("messages")
      .where("friend")
      .equalsIgnoreCase(recipientName);
    console.log("MESSAGES COLLLEECTTIOOON:------", messages);
  };

  const sendMessage = event => {
    event.preventDefault();

    props.handleSendMessage(messageInput);
    setMessageInput("");
  };

  useEffect(() => {
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
    getMessages();
  }, []);

  return (
    <>
      <h2>you and {recipientName}</h2>
      <form onSubmit={sendMessage}>
        <label htmlFor="Message" />
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
      </form>
      <MessageBox recipientName={recipientName} messages={messages} />
    </>
  );
};

export default MessageScreen;
