import React, { useState, useEffect } from "react";
import HomeContainer from "../HomeContainer";

import "../../index.scss";

const Context = React.createContext();

const HomeScreen = ({ ws, messages, addMessage, history }) => {
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

  const [friendID, setFriendID] = useState(0);

  console.log(history.location.pathname);

  const path = history.location.pathname;

  return (
    <Context.Provider value={1}>
      <div className="home-screen">
        <TopNav history={history} />
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

const TopNav = history => {
  return (
    <div className="top-nav">
      <h1>chatty</h1>
      <button
        onClick={() => {
          history.history.push("/settings");
        }}
      >
        Menu
      </button>
    </div>
  );
};

export default HomeScreen;
