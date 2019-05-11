import React, { useState } from "react";

import db from "../../db";

const AddFriend = () => {
  const [contactID, setContactID] = useState("");
  const [nickname, setNickname] = useState("");

  async function addContact(event) {
    event.preventDefault();
    console.log(db.contacts);
    // need some error handling for users that already exist, DUH!
    await db.contacts.add({
      nickname,
      contactID
    });
  }
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
      <button onClick={addContact}>Add to Contacts</button>
    </form>
  );
};

export default AddFriend;
