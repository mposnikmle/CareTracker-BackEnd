require(`dotenv`).config();
const express = require("express");
const app = express();

const staffController = require("./controllers/staff.controller");
const scheduleController = require("./controllers/schedule.controller");
const noteController = require("./controllers/note.controller");
const companyController = require("./controllers/company.controller");
const residentController = require("./controllers/resident.controller");

const cors = require("cors");

const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DBName = process.env.DBNAME;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL + DBName);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to the DB", DBName);
});

app.use(express.json());

app.use(cors());

app.use("/company", companyController);
app.use("/note", noteController);
app.use("/schedule", scheduleController);
app.use("/staff", staffController);
app.use("/resident", residentController);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
