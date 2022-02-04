const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/voter.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newAadhar = await bcrypt.hash(req.body.aadharNumber, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      aadharNumber: newAadhar,
      walletAddress: req.body.walletAddress,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Wallet already Registerd" });
  }
});

app.post("/api/voterstatus", async (req, res) => {
  const voter = await User.findOne({
    walletAddress: req.body.walletAddress,
  });

  if (!voter || voter === null) {
    return res.json({ status: "error", error: "Invalid login" });
  } else {
    return res.json({ status: "ok"});
  }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Sever started on PORT ${PORT}`);
});
