const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/voter.modal");
const ElectionHost = require("./models/electionHost.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const sendEmail = require("./config/sendEmail");
const sendRejectEmail = require("./config/sendRejectEmail");
const jwtVerify = require("./config/JwtVerify");
const deployContract = require("./config/deploy");

dotenv.config({ path: "../.env" });
connectDB();
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
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
    const name = voter.name;
    return res.json({ status: "ok", voterName: name });
  }
});

app.post("/api/election/host", async (req, res) => {
  try {
    await ElectionHost.create({
      organizationName: req.body.name,
      email: req.body.email,
      contactNumber: req.body.phoneNo,
      regNo: req.body.regNo,
      typeOfOrg: req.body.typeoforg,
      eStartDate: req.body.startdate,
      eEndDate: req.body.enddate,
      purpose: req.body.purpose,
      address: req.body.address,
      status: "pending",
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.get("/api/admin/hosts", async (req, res) => {
  try {
    const hosts = await ElectionHost.find(
      { status: "pending" },
      {
        organizationName: 1,
        _id: 0,
        email: 1,
        contactNumber: 1,
        typeOfOrg: 1,
        eStartDate: 1,
        eEndDate: 1,
        purpose: 1,
      }
    );
    res.json({ status: "ok", hosts: hosts });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/admin/approve", async (req, res) => {
  try {
    const key = await sendEmail(req.body.email);
    const apStatus = await ElectionHost.updateOne(
      { email: req.body.email, status: "pending" },
      {
        $set: {
          status: "approved",
          accessKey: key,
          electionStatus: "Not Active",
        },
      }
    );

    if (apStatus.modifiedCount >= 1) {
      res.json({ status: "ok" });
    } else {
      res.json({ status: "error" });
    }
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/admin/reject", async (req, res) => {
  try {
    const statusEmail = await sendRejectEmail(req.body.email);

    if (statusEmail) {
      const apStatus = await ElectionHost.updateOne(
        { email: req.body.email, status: "pending" },
        { $set: { status: "rejected" } }
      );
      if (apStatus.modifiedCount >= 1) {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "error" });
      }
    }
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/login", async (req, res) => {
  try {
    const host = await ElectionHost.findOne({
      status: "approved",
      email: req.body.email,
      accessKey: req.body.key,
    });

    if (!host || host === null) {
      return res.json({ status: "error", error: "Invalid login" });
    } else {
      const token = jwt.sign({ email: req.email }, process.env.JWT_SECRET);
      return res.json({ status: "ok", token: token });
    }
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/getdata", jwtVerify, async (req, res) => {
  try {
    const host = await ElectionHost.findOne({
      status: "approved",
      email: req.body.email,
    });

    if (!host || host === null) {
      return res.json({ status: "error", error: "Invalid login" });
    } else {
      var hostDetails = {
        organizationName: host.organizationName,
        email: host.email,
        contactNumber: host.contactNumber,
        regNo: host.regNo,
        typeOfOrg: host.typeOfOrg,
        purpose: host.purpose,
        address: host.address,
        eStartDate: host.eStartDate,
        eEndDate: host.eEndDate,
        electionStatus: host.electionStatus,
      };

      return res.json({ status: "ok", host: hostDetails });
    }
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/addcandidate", jwtVerify, async (req, res) => {
  try {
    const nameInOrNot = await ElectionHost.findOne({
      email: req.body.email,
      candidates: {
        $elemMatch: {
          name: req.body.cName,
        },
      },
    });

    const walletInOrNot = await ElectionHost.findOne({
      email: req.body.email,
      candidates: {
        $elemMatch: {
          walletAddress: req.body.walletAddress,
        },
      },
    });

    if (nameInOrNot !== null || walletInOrNot !== null) {
      return res.json({ status: "error", error: "Candidate already exist" });
    } else {
      const addStatus = await ElectionHost.updateOne(
        { email: req.body.email, electionStatus: "Not Active" },
        {
          $push: {
            candidates: {
              name: req.body.cName,
              walletAddress: req.body.walletAddress,
            },
          },
        }
      );
      if (addStatus.modifiedCount >= 1) {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "error" });
      }
    }
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/deletecandidate", jwtVerify, async (req, res) => {
  try {
    const deleteIt = await ElectionHost.updateOne(
      {
        email: req.body.email,
        candidates: {
          $elemMatch: {
            walletAddress: req.body.walletAddress,
          },
        },
      },
      {
        $pull: {
          candidates: {
            name: req.body.cName,
            walletAddress: req.body.walletAddress,
          },
        },
      }
    );

    if (deleteIt.modifiedCount >= 1) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "error", error: "Candidate not found" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/getcandidate", jwtVerify, async (req, res) => {
  try {
    const cands = await ElectionHost.findOne(
      {
        email: req.body.email,
      },
      {
        candidates: 1,
      }
    );

    if (!cands || cands === null) {
      return res.json({ status: "error", error: "Invalid login" });
    } else {
      return res.json({ status: "ok", cand: cands });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/deployContract", jwtVerify, async (req, res) => {
  try {
    const deployedDetails = deployContract();
    return res.json({
      status: "ok",
      abi: deployedDetails.ABI,
      bytecode: deployedDetails.bytecode,
    });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/setcontractandabi", jwtVerify, async (req, res) => {
  try {
    const setContract = await ElectionHost.updateOne(
      { email: req.body.email },
      {
        $set: {
          contract: {
            abi: req.body.abi,
            contractAddress: req.body.contractAddress,
          },
          electionStatus: "Active",
        },
      }
    );

    if (setContract.modifiedCount >= 1) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "error" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sever started on PORT ${PORT}`);
});
