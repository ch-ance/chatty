import React from "react";
import Login from "./Login";
// import axios from "axios";

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("token");
      return <>{token ? <Component {...this.props} /> : <Login />}</>;
    }
  };
}
