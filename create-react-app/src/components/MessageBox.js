import React, { Component } from "react";
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
    this.state = {};
  }
  render() {
    return (
      <StyledMessages>
        <ul>
          {this.props.messages.reverse().map(msg => {
            return msg.text && <li>{msg.text}</li>;
          })}
        </ul>
      </StyledMessages>
    );
  }
}

export default MessageBox;
