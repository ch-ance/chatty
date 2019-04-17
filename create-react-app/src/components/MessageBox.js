import React, { Component } from "react";
import db from "../database/db";
import "./messages.css";
import styled from "styled-components";

const StyledMessages = styled.div`
  background-color: lightgrey;
  height: 100%;
  width: 100vw;
  max-width: 100%;
  overflow: scroll;
`;

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  render() {
    return (
      <StyledMessages>
        <ul>
          {this.props.messages && this.props.messages.length > 0 ? (
            this.props.messages
              .filter(message => {
                return (
                  message.me === localStorage.getItem("username") ||
                  message.friend === this.props.recepientName
                );
              })
              .map(message => {
                return (
                  <li className={message.isFromUser ? "userMessage" : ""}>
                    {message.text}
                  </li>
                );
              })
          ) : (
            <li>No messages</li>
          )}
        </ul>
      </StyledMessages>
    );
  }
}

export default MessageBox;
