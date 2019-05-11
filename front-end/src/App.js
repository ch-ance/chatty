import React, { Component, useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";

import HomeScreen from "./components/HomeScreen";
import requiresConnection from "./HOCs/requiresConnection";

// traditional indexedDB
// const request = indexedDB.open("chatty", 1);

// request.onupgradeneeded = event => {
//   // Create the database
//   const db = event.target.result;

//   const objectStore = db.createObjectStore("contacts", {
//     keyPath: "contactID"
//   });

//   objectStore.createIndex("nickname", "nickname", { unique: false });

//   objectStore.transaction.oncomplete = () => {
//     console.log("oncompleteing");
//     const contactsObjectStore = db
//       .transaction("contacts", "readwrite")
//       .objectStore("contacts");
//     // add a sample contact
//     contactsObjectStore.add({
//       contactID: "abcd1234",
//       nickname: "Fake Friend"
//     });
//   };
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  addMessage = message => {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <HomeScreen
              {...props}
              ws={this.props.ws}
              messages={this.state.messages}
              addMessage={this.addMessage}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(requiresConnection(App));
