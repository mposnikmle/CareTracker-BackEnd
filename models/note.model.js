const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  staffID: {
    type: String,
    // unique: true,
  },
  residentID: {
    type: String,
    // unique: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
