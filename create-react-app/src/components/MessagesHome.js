import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/url";
import MessagePreview from "./MessagePreview";
import "./messagesHome.scss";

const MessagesHome = props => {
  const [friendName, setFriendName] = useState("");

  if (localStorage.getItem("token") == null) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <header>
        <h2>Chatty</h2>
      </header>
      <ul>
        {props.friends.map(friend => {
          return (
            <Link key={friend.id} to={`/chat/${friend.username}`}>
              <MessagePreview friend={friend} />
            </Link>
          );
        })}
      </ul>
      <div>
        <h3>Add a friend!</h3>
        <form>
          <label htmlFor="friendName" />
          <input
            onChange={e => setFriendName(e.target.value)}
            value={friendName}
          />
          <button onClick={addFriend}>Add friend!</button>
        </form>
        <button onClick={logout}>LOGOUT</button>
      </div>
    </main>
  );

  function addFriend(event) {
    event.preventDefault();
    console.log("trying to add " + friendName + " as a friend");
    axios
      .post(`${baseURL}/api/users/${localStorage.getItem("id")}/addFriend`, {
        friendName
      })
      .then(res => {
        console.log("Friend added!", res);
      })
      .catch(err => {
        console.error("Error adding friend: ", err);
      });
    setFriendName("");
  }
  function logout(event) {
    event.preventDefault();
    axios.put(
      `${baseURL}/api/users/${localStorage.getItem("id")}/disconnect`,
      {}
    );
    localStorage.clear();
    setFriendName("wubalubadubdub!");
  }
};

export default MessagesHome;
