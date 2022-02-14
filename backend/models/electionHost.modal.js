const mongoose = require("mongoose");

const ElectionHost = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true },
    regNo: { type: String, required: true },
    eStartDate: { type: Date, required: true },
    eEndDate: { type: Date, required: true },
    typeOfOrg:{type:String,required:true},
    purpose: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timeStamps: true },
  { collection: "election-host-data" }
);

const model = mongoose.model("ElectionHostData", ElectionHost);

module.exports = model;
