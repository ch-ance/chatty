import React from "react";

const Contact = ({ contact }) => {
  console.log(contact);
  return <li>{contact.nickname}</li>;
};

export default Contact;
