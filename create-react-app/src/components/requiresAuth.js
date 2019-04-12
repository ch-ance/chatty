import React from "react";
import MessagesHome from "./MessagesHome";
// import axios from "axios";

export default function(Component) {
  return class Authenticated extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const token = localStorage.getItem("token");
      return (
        <>
          {!token ? (
            <Component {...this.props} />
          ) : (
            <MessagesHome
              {...this.props}
              messages={this.props.messages}
              friends={this.props.friends}
            />
          )}
        </>
      );
    }
  };
}
