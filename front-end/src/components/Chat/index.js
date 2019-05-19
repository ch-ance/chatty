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
    <div className={"chatPage"}>
      <h3>Chatting with {friendID}</h3>
      <form onSubmit={sendMessage} />
      <ul>
        {messages.map(message => {
          return <li>{message.message}</li>;
        })}
      </ul>

      <input
        type="text"
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
      />

      <button>Send message</button>
    </div>
  );
};

export default Chat;
