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
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);

// const io = require("socket.io")();

// io.on("connection", client => {
//   console.log("user is connecting");
//   client.on("chat message", msg => {
//     console.log(`Message!: ${msg}`);
//     client.broadcast.emit("chat message", msg);
//   });
// });

// const port = 8000;
// io.listen(port);
// console.log("listening on port ", port);
