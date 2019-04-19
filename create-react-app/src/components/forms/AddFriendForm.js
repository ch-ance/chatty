import React, { useState } from "react";

const AddFriendForm = ({ addFriend }) => {
  const [friend, setFriend] = useState("");

  return (
    <form
      onSubmit={e => {
        addFriend(e, friend);
        setFriend("");
      }}
    >
      <label htmlFor="Friend">Friend</label>
      <input
        type="text"
        value={friend}
        onChange={e => setFriend(e.target.value)}
      />
    </form>
  );
};

export default AddFriendForm;
