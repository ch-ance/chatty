const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(helmet());
app.use(cors());
const server = require("http").Server(app);
const io = require("socket.io")(server);
io.on("connection", client => {
  console.log("user is connecting");
  client.on("chat message", (msg, socketId, senderName) => {
    client.broadcast.to(socketId).emit("chat message", msg, senderName);

    console.log(`Message!: ${msg}!!!`);
    console.log(`FRIENDSOCKETID: ${socketId}`);
    console.log(`MY_NAME: ${senderName}`);
  });

  // client.on("logging out", (username, socket_ids) => {
  //   socket_ids.forEach(id => {
  //     client.broadcast.to(id).emit("friend logged out", username);
  //   });
  // });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
