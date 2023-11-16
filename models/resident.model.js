const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  residentName: { type: String },
  residentID: { type: mongoose.Types.ObjectId, ref: "Resident" },
  residentAddress: { type: String },
  staffAssigned: { type: Boolean },
  allergy: { type: String },
  residentEmergencyContact: { type: Number }
});

/* 
residentSupported = residentID + staffID
if (residentSupported = true)
{}
 */

/* 
assign a residentSupported role in users - boolean
The boolean should be equal to false
you are adding a resident id from an array (use find one)
into the boolean of the residentSupported.
then you will preform an update of the staff/resident ID
after the resident is added/updated, the boolean is equal to true
 */

module.exports = mongoose.model("Resident", residentSchema);
