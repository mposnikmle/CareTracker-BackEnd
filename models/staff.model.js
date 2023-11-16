const mongoose = require("mongoose");


const StaffSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "Staff"
    },
   
  /*canEditStaffRoles: {
        type: Boolean
    },
    canEditResidentRoles: {
      type: Boolean
    },
    imageURL: {
        type: String
    },
    certificates: {
        type: String
    },
    licenseExpDate: {
        type: String
    },
    pto: {
        type: String
    },
    pay: {
        type: String
    }*/
});

module.exports = mongoose.model("Staff", StaffSchema);
