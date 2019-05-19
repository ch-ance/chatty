import React, { useState, useEffect } from "react";

import Contact from "../Contact";

import db from "../../db";

import "../../index.scss";

const ContactList = ({ history, setFriendID }) => {
  const [contacts, setContacts] = useState([]);

  async function getContacts() {
    await db
      .table("contacts")
      .where("myID")
      .equals(localStorage.getItem("userID"))
      .toArray()
      .then(contacts => {
        setContacts(contacts);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ul className="contact-list">
      {contacts.map(contact => {
        return (
          <Contact
            contact={contact}
            history={history}
            setFriendID={setFriendID}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
