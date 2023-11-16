const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: Array
  },
  companyID: {
    type: String
    // unique: true,
  },
  address: {
    type: String
  },
  activeInDropDown: {
    type: Boolean
    // unique: true,
  }
});

module.exports = mongoose.model("Company", CompanySchema);
