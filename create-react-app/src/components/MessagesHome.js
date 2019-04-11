import React, { Component } from "react";
import { Link } from "react-router-dom";

class MessagesHome extends Component {
  constructor(props) {
    super(props);
    this.state = { homePage: null };
  }
  render() {
    return (
      <>
        <main>
          <button onClick={this.logout}>Logout</button>
          <Link to="/">Back to home page</Link>
          <h2>chatty Homepage...!</h2>
          <h3>Messages:-_-:</h3>
          <ul>
            {this.props.friends.map(friend => {
              return <Link to={`/${friend.username}`}>{friend.username}</Link>;
            })}
          </ul>
        </main>
      </>
    );
  }

  logout = event => {
    event.preventDefault();
    localStorage.clear();
    this.props.toggleLoggedIn();
  };
}

export default MessagesHome;
