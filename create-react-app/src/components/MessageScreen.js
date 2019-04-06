import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledMessages = styled.div`
  background-color: red;
  height: 70vh;
  width: 100vw;
  max-width: 100%;
`;

const MessageScreen = () => {
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);

  // open the websocket? on mount

  useEffect(() => {
    setUserMessages([{ text: "First!" }]);
  }, []);

  useEffect(() => {
    // let request = window.indexedDB.open("messages_db", 1);
    // request.onerror = function() {
    //   console.log("Database failed to open");
    // };
    // request.onsuccess = function() {
    //   console.log("Database opened successfully");
    // };
    // // db = request.result;
  }, [userMessages]);

  // useEffect to listen for messages?

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
          {userMessages.map(message => {
            return <li>{message.text}</li>;
          })}
        </ul>
      </StyledMessages>
      <form>
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
