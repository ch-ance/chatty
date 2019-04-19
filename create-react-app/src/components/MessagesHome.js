import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/url";
import MessagePreview from "./MessagePreview";
import "./messagesHome.scss";

const MessagesHome = props => {
  const [friendName, setFriendName] = useState("");

  const [friendToggled, toggleFriend] = useState(false);

  useEffect(() => {
    props.updateFriends();
  }, []);

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
      <button onClick={toggleDisplay} className="addFriendButton">
        Add a Friend!
      </button>
      <div className={friendToggled ? "displayAddFriend" : "hide"}>
        <form>
          <label htmlFor="friendName" />
          <input
            onChange={e => setFriendName(e.target.value)}
            value={friendName}
          />
          <button onClick={addFriend}>Send friend request</button>
        </form>
        <button onClick={props.logout}>LOGOUT</button>
      </div>
    </main>
  );

  function toggleDisplay(event) {
    event.preventDefault();
    toggleFriend(!friendToggled);
  }

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
};

export default MessagesHome;
