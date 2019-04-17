import React, { Component } from "react";
import "./messageScreen.scss";

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  render() {
    return (
      <div className="messageBox">
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
      </div>
    );
  }
}

export default MessageBox;
