const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    key: { type: String, required: false },
  },
  { collection: "metheadmin" }
);

const model = mongoose.model("AdminData", Admin);

module.exports = model;
