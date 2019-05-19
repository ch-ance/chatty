import React from "react";

import AddFriend from "../AddFriend";

const Settings = ({ history }) => {
  const path = history.location.pathname;
  console.log(path);
  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault();
          history.push("/addContact");
        }}
      >
        Add a contact
      </button>
      <GetMyID />
    </div>
  );
};

const GetMyID = () => {
  return (
    <div className="get-id-container">
      <h3>{`Your ID: ${localStorage.getItem("userID")}`}</h3>
    </div>
  );
};

export default Settings;
