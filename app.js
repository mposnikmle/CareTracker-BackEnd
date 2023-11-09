require(`dotenv`).config();
const express = require("express");
const app = express();
const cors = require("cors");

const noteController = require("./controllers/note.controller");

const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DBName = process.env.DBName;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL + DBName);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to the DB", DBName);
});
app.use(cors());
app.use(express.json());

app.use("/note", noteController);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
