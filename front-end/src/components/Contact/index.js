import React from "react";

const Contact = ({ contact, history, setFriendID }) => {
  console.log(contact);
  return (
    <li>
      <div
        onClick={() => {
          setFriendID(contact.contactID);
          history.push("/chat");
        }}
      >
        {contact.nickname}
      </div>
    </li>
  );
};

export default Contact;
