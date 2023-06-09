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

const MONGODB_URI =
  "mongodb+srv://shubham:shubhmisal75@cluster0.9ipafv0.mongodb.net/user";
const DB_NAME = "user";

// Connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
}

// Import routes
const userRoute = require("./routes/user_route");
const stockRoute = require("./routes/stock_route");
app.use("", userRoute);
app.use("", stockRoute);

app.get("", (req, res) => {
  res.sendFile(__dirname + "/html.html");
});

// WebSocket server
wss.on("connection", async (socket, req) => {
  console.log("Client connected");
  if (!db) {
    db = await connectToMongoDB();
  }
  const user = db.collection("users");
  const stocks = db.collection("stocks");

  const changeStreamForUsers = user.watch();
  const changeStreamForStocks = stocks.watch({ fullDocument: "updateLookup" });

  const allStocks = await stocks.find().toArray();
  socket.send(JSON.stringify({ type: "all_stocks", data: allStocks }));

  changeStreamForUsers.on("change", (change) => {
    socket.send(JSON.stringify(change));
  });

  changeStreamForStocks.on("change", (change) => {
    socket.send(JSON.stringify(change));
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

// Connect to MongoDB
let db;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
