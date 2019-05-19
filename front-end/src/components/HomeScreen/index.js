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
          path={path}
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

const TopNav = ({ history, path, online, toggleOnline }) => {
  // This should possibly be moved, and changed to "goOffline"
  // Maybe check if the actual ws is connected?
  // as the default behavior will be 'connected'/online
  // function goOnline() {
  //   const message = {
  //     userID: localStorage.getItem("userID"),
  //     identifier: true
  //   };
  //   ws.send(JSON.stringify(message));
  // }

  return (
    <div className="top-nav">
      <button
        className={path !== "/" ? "back" : "none"}
        onClick={e => {
          e.preventDefault();
          history.push("/");
        }}
      >
        Back
      </button>
      <h1>chatty</h1>
      <h3>{online ? "Connected" : "Offline"}</h3>
      <button
        onClick={() => {
          path === "/settings" ? history.push("/") : history.push("/settings");
        }}
      >
        {path === "/settings" ? "Close Menu" : "Open Menu"}
      </button>
    </div>
  );
};

export default HomeScreen;
