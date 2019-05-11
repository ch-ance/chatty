import React, { useState, useEffect } from "react";
import HomeContainer from "../HomeContainer";
import Chat from "../Chat";

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
    <div>
      <TopNav history={history} />
      <HomeContainer path={path} />
    </div>
  );
};

const TopNav = history => {
  return (
    <div>
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
