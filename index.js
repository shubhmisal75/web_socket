const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const WebSocket = require("ws");
const { MongoClient } = require("mongodb");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------import route----
const userRoute = require("./routes/user_route");
const stockRoute = require("./routes/stock_route");

//------------
mongoose
  .connect(
    "mongodb+srv://shubham:shubhmisal75@cluster0.9ipafv0.mongodb.net/user",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongodb running"))
  .catch((err) => console.log(err));

app.listen(3100, function () {
  console.log("Express app running on port " + 3100);
});
app.use("", userRoute);
app.use("", stockRoute);

//----------web socket server --------------------//
const server = new WebSocket.Server({ port: 8080 });
server.on("connection", (socket) => {
  console.log("Client connected");
  const client = new MongoClient(
    "mongodb+srv://shubham:shubhmisal75@cluster0.9ipafv0.mongodb.net/user",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  const db = client.db("user");
  const user = db.collection("users");
  const stocks = db.collection("stocks");

  const changeStreamForUsers = user.watch();
  const changeStreamForStocks = stocks.watch();

  changeStreamForUsers.on("change", (change) => {
    socket.send(JSON.stringify(change));
  });

  changeStreamForStocks.on("change", (change) => {
    socket.send(JSON.stringify(change));
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    client.close();
  });
});
