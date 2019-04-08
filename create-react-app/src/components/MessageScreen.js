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
      messageInput: ""
    };

    this.recipientName = window.location.pathname;
  }

  componentDidMount() {}

  getMessages = () => {};

  sendMessage = event => {
    event.preventDefault();

    this.props.handleSendMessage(this.state.messageInput);
    this.props.emitMessageSocket(this.state.messageInput);
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
        <h2>
          you and
          {//gets rid of the '/' from the route
          this.recipientName
            .split("")
            .splice(1)
            .reverse()
            .concat(" ")
            .reverse()
            .join("")}
        </h2>
        <MessageBox messages={this.props.messages} />
        <form onSubmit={this.sendMessage}>
          <label htmlFor="Message" />
          <input
            type="text"
            value={this.state.messageInput}
            onChange={this.inputHandler}
          />
        </form>
      </>
    );
  }
}

export default MessageScreen;
