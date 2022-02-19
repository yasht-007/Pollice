const mongoose = require("mongoose");

const ElectionHost = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true },
    regNo: { type: String, required: true },
    eStartDate: { type: String, required: true },
    eEndDate: { type: String, required: true },
    typeOfOrg: { type: String, required: true },
    purpose: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    accessKey: { type: String, required: false, unique: true },
    electionStatus: { type: String, required: false },
    candidates: [
      {
        type: Object,
        required: false,
        unique: true,
        name: { type: String, required: false },
        walletAddress: { type: String, required: false },
      },
    ],
    contract: { type: Object, required: false },
  },
  { timeStamps: true },
  { collection: "election-host-data" }
);

const model = mongoose.model("ElectionHostData", ElectionHost);

module.exports = model;
