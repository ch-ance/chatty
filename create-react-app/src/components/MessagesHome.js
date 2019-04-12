import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMain = styled.main`
  width: 50px;
`;

const StyledMessageHomeHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFriendsUL = styled.ul`
  text-align: right;
  margin-right: 5rem;

  a {
    text-decoration: none;
    font-size: 3rem;
  }
`;

class MessagesHome extends Component {
  constructor(props) {
    super(props);
    this.state = { homePage: null };
  }
  render() {
    return (
      <main>
        <button onClick={this.logout}>Logout</button>
        <StyledMessageHomeHeader>
          <h2>chatty Homepage...!</h2>
          <h3>Messages:-_-:</h3>
        </StyledMessageHomeHeader>
        <StyledFriendsUL>
          {this.props.friends.map(friend => {
            return (
              <Link to={`/${friend.username}`}>
                <a>{friend.username}</a>
              </Link>
            );
          })}
        </StyledFriendsUL>
      </main>
    );
  }

  logout = event => {
    event.preventDefault();
    localStorage.clear();
  };
}

export default MessagesHome;
