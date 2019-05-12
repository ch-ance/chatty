import React, { useState, useEffect } from "react";
import HomeContainer from "../HomeContainer";

import "../../index.scss";

const Context = React.createContext();

const HomeScreen = ({
  ws,
  messages,
  addMessage,
  history,
  toggleOnline,
  online
}) => {
  useEffect(() => {
    ws.onopen = client => {
      console.log("connected");
    };

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      console.log("New Message: ", message);
      addMessage(message);
    };
  }, [addMessage, ws.onmessage, ws.onopen]);

  const [friendID, setFriendID] = useState("");

  console.log(history.location.pathname);

  const path = history.location.pathname;

  return (
    <Context.Provider value={1}>
      <div className="home-screen">
        <TopNav
          history={history}
          online={online}
          toggleOnline={toggleOnline}
          ws={ws}
        />
        <HomeContainer
          path={path}
          history={history}
          messages={messages}
          friendID={friendID}
          setFriendID={setFriendID}
          ws={ws}
        />
      </div>
    </Context.Provider>
  );
};

const TopNav = ({ history, online, toggleOnline, ws }) => {
  console.log("ONLINE? :", online);

  function goOnline() {
    const message = {
      userID: localStorage.getItem("userID"),
      identifier: true
    };
    ws.send(JSON.stringify(message));
  }

  return (
    <div className="top-nav">
      <h1>chatty</h1>
      <h3
        onClick={() => {
          toggleOnline();
          goOnline();
        }}
      >
        {online ? "Connected" : "Tap here to go online"}
      </h3>
      <button
        onClick={() => {
          history.push("/settings");
        }}
      >
        Menu
      </button>
    </div>
  );
};

export default HomeScreen;
