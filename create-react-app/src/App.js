import React, { Component } from "react";
import "./App.css";
import MessagesHome from "./components/MessagesHome";

// conditional render based on whether user is logged in
// login screen
// messages screen/contacts => message app screen

class App extends Component {
  render() {
    return (
      <>
        <main>
          <MessagesHome />
        </main>
      </>
    );
  }
}

export default App;
