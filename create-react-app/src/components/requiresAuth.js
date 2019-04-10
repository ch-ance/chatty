import React from "react";
import MessagesHome from "./MessagesHome";
// import axios from "axios";

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("token");
      return (
        <>
          {!token ? (
            <Component {...this.props} />
          ) : (
            <MessagesHome {...this.props} />
          )}
        </>
      );
    }
  };
}
