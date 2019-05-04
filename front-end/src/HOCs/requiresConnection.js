import React, { useEffect } from "react";
const url = "ws://localhost:3030";

const requiresConnection = Component =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        ws: undefined
      };
    }
    connect = () => {
      this.setState({
        ws: new WebSocket(url)
      });
    };

    componentDidMount() {
      const userID = this.getID();
      this.props.history.push(`/${userID}`);
    }
    getID() {
      return Math.floor(Math.random() * 100);
    }

    render() {
      // if websocket is connected, render HomeScreen
      if (this.state.ws !== undefined) {
        return <Component ws={this.state.ws} />;
      } else {
        return <Connect connect={this.connect} />;
      }
    }
  };

const Connect = ({ connect }) => {
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
