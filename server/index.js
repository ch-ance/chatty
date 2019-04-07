const io = require("socket.io")();

io.on("connection", client => {
  console.log("user is connecting");
  client.on("chat message", msg => {
    console.log(`Message!: ${msg}`);
    io.emit("chat message", msg);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
