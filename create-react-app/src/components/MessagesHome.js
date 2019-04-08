import React from "react";
import { Route, Link } from "react-router-dom";

import MessageScreen from "./MessageScreen";
import AddFriendForm from "./forms/AddFriendForm";
import requiresAuth from "./requiresAuth";

const MessagesHome = ({
  messages,
  handleSendMessage,
  emitMessageSocket,
  clearChat,
  friends,
  addFriend,
  broadcastId
}) => {
  return (
    <>
      <button onClick={broadcastId}>Broadcast ID</button>
      <Route
        path="/"
        exact
        render={props => (
          <Home {...props} addFriend={addFriend} friends={friends} />
        )}
      />
      <Route path="/alice" component={MessageScreen} />
      <Route
        path="/test"
        render={props => (
          <MessageScreen
            {...props}
            handleSendMessage={handleSendMessage}
            messages={messages}
            emitMessageSocket={emitMessageSocket}
            clearChat={clearChat}
          />
        )}
      />
      <Route
        path="/:friend"
        render={props => (
          <MessageScreen
            {...props}
            handleSendMessage={handleSendMessage}
            messages={messages}
            emitMessageSocket={emitMessageSocket}
            clearChat={clearChat}
          />
        )}
      />
    </>
  );
};

const Home = ({ addFriend, friends }) => {
  return (
    <>
      <h2>Messsages: </h2>
      <br />
      <h3>Add Friend:</h3>
      <AddFriendForm addFriend={addFriend} />
      <h3>Friends: </h3>
      <ul>
        {friends.map(friend => {
          return <Link to={`/${friend.friendName}`}>{friend.friendName}</Link>;
        })}
      </ul>
      <Link to="/alice">Alice</Link>
    </>
  );
};

export default requiresAuth(MessagesHome);
