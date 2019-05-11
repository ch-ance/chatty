import React, { useState } from "react";

const Chat = ({ ws, messages, friendID }) => {
  function sendMessage(event) {
    event.preventDefault();
    const message = {
      pm: true,
      friendID,
      name: "Chance",
      message: messageText
    };
    ws.send(JSON.stringify(message));
    // need to stringify for WebSocket server to accept and read it
    setMessageText("");
  }

  const [messageText, setMessageText] = useState("");

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
        />

        <button>Send message</button>
      </form>
      <ul>
        {messages.map(message => {
          return <li>{message.message}</li>;
        })}
      </ul>
    </div>
  );
};

export default Chat;
