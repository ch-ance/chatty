import React, { Component } from "react";
import MessageBox from "./MessageBox";

// const UserMessage = styled.li`
//   text-align: right;
//   color: white;
// `;

// const OtherMessage = styled.li`
//   text-align: left;
//   color: blue;
// `;

class MessageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: "",
      messages: []
    };

    this.recipientName = window.location.pathname.split("/");
  }

  sendMessage = event => {
    event.preventDefault();

    this.props.handleSendMessage(this.state.messageInput);
    this.setState({ messageInput: "" });
  };

  inputHandler = event => {
    this.setState({
      messageInput: event.target.value
    });
  };

  render() {
    return (
      <>
        <h2>you and {this.recipientName}</h2>
        <form onSubmit={this.sendMessage}>
          <label htmlFor="Message" />
          <input
            type="text"
            value={this.state.messageInput}
            onChange={this.inputHandler}
          />
        </form>
        <MessageBox
          recipientName={this.recipientName}
          messages={this.props.messages}
        />
      </>
    );
  }
}

export default MessageScreen;
