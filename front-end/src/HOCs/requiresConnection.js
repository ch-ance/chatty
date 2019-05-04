import React from "react";

const requiresConnection = Component =>
  class extends React.Component {
    render() {
      // if websocket is connected, render HomeScreen
      if (true) {
        return <Component />;
      } else {
        return <Connect />;
      }
    }
  };

const Connect = () => {
  return (
    <div>
      <button>Click to connect</button>
    </div>
  );
};

export default requiresConnection;
