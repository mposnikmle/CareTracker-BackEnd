require("dotenv").config();
const express = require("express");
const app = express();
const staffController = require("./controllers/staff.controller");

const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DBName = process.env.DBNAME;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL + DBName);
const db = mongoose.connection;
db.once("open", () => {
    console.log("connected to the DB", DBName);
});

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});

app.use(express.json());

app.use("/staff", staffController);