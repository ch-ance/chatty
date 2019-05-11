import React, { useState } from "react";

const AddFriend = () => {
  const [contactID, setContactID] = useState("");
  const [nickname, setNickname] = useState("");
  return (
    <form>
      <h2>Enter contact ID</h2>
      <input
        type="text"
        value={contactID}
        onChange={e => setContactID(e.target.value)}
      />
      <h2>Enter a nickname for this contact</h2>
      <input
        type="text"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <button>Add to Contacts</button>
    </form>
  );
};

export default AddFriend;
