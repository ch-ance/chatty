import React, { Component } from "react";
import db from "../database/db";
import styled from "styled-components";

const StyledMessages = styled.div`
  background-color: red;
  height: 70vh;
  width: 100vw;
  max-width: 100%;
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
          {this.props.messages ? (
            this.props.messages
              .filter(message => {
                return (
                  message.me === localStorage.getItem("username") ||
                  message.friend === this.props.recepientName
                );
              })
              .map(message => {
                return (
                  message.text && (
                    <li>{`From: ${message.senderName}: ${message.text}`}</li>
                  )
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
