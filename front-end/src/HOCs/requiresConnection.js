import React, { useEffect } from "react";

import Login from "../components/Login/Login";
import "../index.scss";

const url = "ws://localhost:3030";

const requiresConnection = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ws: undefined,
        user: null
      };
    }
    connect = () => {
      this.setState({
        ws: new WebSocket(url)
      });
    };

    render() {
      // if user is not logged in, return Login page
      if (this.state.user === null) {
        return <Login />;
      }

      // if websocket is connected, render HomeScreen
      if (this.state.ws !== undefined) {
        return <Component ws={this.state.ws} />;
      } else {
        return <Connect connect={this.connect} props={this.props} />;
      }
    }
  };

const Connect = ({ connect, props }) => {
  useEffect(() => {
    connect();
  }, []);

  return (
    <div>
      <h2>Attempting to connect . . .</h2>
    </div>
  );
};

export default requiresConnection;
