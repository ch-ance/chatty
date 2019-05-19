import React, { useState } from "react";

import ContactList from "../ContactList";
import Settings from "../Settings";
import Chat from "../Chat";
import AddContact from "../AddFriend";

const HomeContainer = ({
  history,
  path,
  messages,
  friendID,
  setFriendID,
  ws
}) => {
  console.log(path.path);

  if (path === "/") {
    return <ContactList history={history} setFriendID={setFriendID} />;
  }

  if (path === "/settings") {
    return <Settings history={history} />;
  }

  if (path === "/chat") {
    return <Chat friendID={friendID} messages={messages} ws={ws} />;
  }

  if (path === "/addContact") {
    return <AddContact />;
  }

  return <h2>Uh something is wrong</h2>;
};

export default HomeContainer;
