import React, { useState } from "react";

import ContactsList from "../ContactsList";
import Settings from "../Settings";
import Chat from "../Chat";

const HomeContainer = ({ history, path, messages }) => {
  console.log(path.path);

  const [friendID, setFriendID] = useState("");
  if (path === "/") {
    return <ContactsList history={history} setFriendID={setFriendID} />;
  }

  if (path === "/settings") {
    return <Settings />;
  }

  if (path === "/chat") {
    return <Chat friendID={friendID} messages={messages} />;
  }

  return <h2>Uh something is wrong</h2>;
};

export default HomeContainer;
