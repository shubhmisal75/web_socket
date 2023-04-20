const WebSocket = require("ws");

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (event) => {
  console.log("connected to server");
});

socket.addEventListener("message", (event) => {
  const change = JSON.parse(event.data);
  console.log(change);
  console.log(`received change: ${change}`);
});
