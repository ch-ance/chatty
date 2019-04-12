import React, { Component } from "react";
import requiresAuth from "./requiresAuth";
import Login from "./Login";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      toggle: true
    };
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    return <Login toggle={this.toggle} />;
  }
}

export default requiresAuth(Home);
