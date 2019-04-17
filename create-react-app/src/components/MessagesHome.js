import React, { useState, useEffect, Component } from "react";
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
            <Link to={`/chat/${friend.username}`}>
              <a>
                <MessagePreview friend={friend} />
              </a>
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
    localStorage.clear();
    setFriendName("wubalubadubdub!");
  }
};

export default MessagesHome;
