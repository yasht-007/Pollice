const mongoose = require("mongoose");

const Voter = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    aadharNumber: { type: String, required: true, unique: true },
    walletAddress: { type: String, unique: true },

    registerations: [
      {
        eId: { type: String, required: false, unique: true },
        approvalStatus: { type: String, required: false },
      },
    ],
  },
  { timeStamps: true },
  { collection: "voter-data" }
);

const model = mongoose.model("VoterData", Voter);

module.exports = model;
