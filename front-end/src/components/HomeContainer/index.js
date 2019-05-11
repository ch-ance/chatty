import React from "react";

import ContactsList from "../ContactsList";
import Settings from "../Settings";

const HomeContainer = path => {
  console.log(path.path);
  if (path.path === "/") {
    return <ContactsList />;
  }

  if (path.path === "/settings") {
    return <Settings />;
  }

  return <h2>Uh something is wrong</h2>;
};

export default HomeContainer;
