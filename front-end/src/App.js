import React, { Component } from "react";
import { Route } from "react-router-dom";

import requiresConnection from "./HOCs/requiresConnection";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeScreen />
      </div>
    );
  }
}

const HomeScreen = () => {
  return (
    <div>
      <h1>HomeScreen</h1>
    </div>
  );
};

export default requiresConnection(App);
