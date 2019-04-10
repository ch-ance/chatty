import React, { Component } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import baseURL from "../api/url";

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

    this.recipientName = window.location.pathname.replace("/", "");
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

  componentDidUpdate() {
    axios
      .get(`${baseURL}/api/users/${localStorage.getItem("id")}/friends`)
      .then(res => {
        const friend = res.data.filter(friend => {
          return friend.username === this.recipientName;
        });
        // console.log(
        //   `USERNAME: ${res.data[0].username} ----- RECIP: ${this.recipientName}`
        // );
        console.log("FRIEND ID ", friend[0].socket_id);
        localStorage.setItem("friend_socket_id", friend[0].socket_id);
      })
      .catch(err => {
        console.log("COULDN'T GET FRIEND: ", err);
      });
  }

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
