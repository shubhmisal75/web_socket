const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const { MongoClient } = require("mongodb");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

app.use("", userRoute);
app.use("", stockRoute);

app.get("", (req, res) => {
  res.sendFile(__dirname + "/html.html");
});

wss.on("connection", (socket) => {
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

server.listen(process.env.PORT || 3100, () => {
  console.log("Server started on port 3100");
});
