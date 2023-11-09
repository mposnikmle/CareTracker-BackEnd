require(`dotenv`).config();
const express = require("express");
const app = express();
const scheduleController = require("./controllers/schedule.controller")
const noteController = require("./controllers/note.controller");

const cors = require("cors");

const mongoose = require("mongoose");

const PORT = process.env.PORT;

app.use(express.json());

const DBName = process.env.DBName;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL + DBName);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to the DB", DBName);
});

app.use(cors());

app.use("/note", noteController);
app.use("/schedule", scheduleController);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
