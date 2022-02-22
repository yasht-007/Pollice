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
    return res.json({ status: "ok", voterName: name, voter: voter });
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
      return res.json({ status: "error", message: "Candidate already exist" });
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
        res.json({
          status: "error",
          message: "contract is either deployed or in active state.",
        });
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
            walletAddress: req.body.walletAddress,
          },
          electionStatus: "Deployed",
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

app.post("/api/host/getelectionstatus", jwtVerify, async (req, res) => {
  try {
    const estatus = await ElectionHost.findOne(
      {
        email: req.body.email,
      },
      {
        electionStatus: 1,
      }
    );

    if (!estatus || estatus === null) {
      return res.json({ status: "error", error: "Invalid election status" });
    } else {
      return res.json({ status: "ok", electionStatus: estatus.electionStatus });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.get("/api/elections", async (req, res) => {
  try {
    const elections = await ElectionHost.find(
      {
        $or: [
          { electionStatus: "Active" },
          { electionStatus: "Deployed" },
          { electionStatus: "Started" },
          { electionStatus: "Ended" },
        ],
      },
      {
        _id: 1,
        organizationName: 1,
        typeOfOrg: 1,
        eStartDate: 1,
        eEndDate: 1,
        electionStatus: 1,
      }
    );

    if (!elections || elections === null || elections.length === 0) {
      return res.json({ status: "error", error: "No elections found" });
    } else {
      return res.json({ status: "ok", elections: elections });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/elections/registervoter", async (req, res) => {
  try {
    const addStatus = await ElectionHost.updateOne(
      { _id: req.body.electionId, electionStatus: "Deployed" },
      {
        $push: {
          voters: {
            name: req.body.name,
            walletAddress: req.body.walletAddress,
            email: req.body.email,
            aadharNumber: req.body.aadhar,
            approvalStatus: "Pending",
          },
        },
      }
    );
    if (addStatus.modifiedCount >= 1) {
      const entryVoter = await User.updateOne(
        { walletAddress: req.body.walletAddress },
        {
          $push: {
            registerations: {
              eId: req.body.electionId.toString(),
              approvalStatus: "Requested",
            },
          },
        }
      );

      if (entryVoter.modifiedCount >= 1) {
        return res.json({ status: "ok" });
      }
    } else {
      res.json({
        status: "error",
        message: "Unknown Error. Please contact your host",
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/elections/voterregisterstatus", async (req, res) => {
  try {
    const walletInOrNot = await ElectionHost.findOne({
      _id: req.body.electionId,
      voters: {
        $elemMatch: {
          name: "Rudra Pathak",
          walletAddress: req.body.walletAddress,
        },
      },
    });

    // console.log(walletInOrNot);

    if (!walletInOrNot || walletInOrNot === null) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "error" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/getvoters", jwtVerify, async (req, res) => {
  try {
    const voters = await ElectionHost.findOne(
      {
        email: req.body.email,
        "voters.approvalStatus": "Pending",
      },
      {
        voters: 1,
      }
    );

    if (!voters || voters === null) {
      return res.json({ status: "error", error: "Invalid Voters" });
    } else {
      return res.json({ status: "ok", voters: voters });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/getabiandcontract", jwtVerify, async (req, res) => {
  try {
    const ContractData = await ElectionHost.findOne(
      {
        email: req.body.email,
      },
      {
        _id: 1,
        contract: 1,
      }
    );

    if (!ContractData || ContractData === null) {
      return res.json({ status: "error", error: "Invalid Contract Data" });
    } else {
      return res.json({
        status: "ok",
        contractData: ContractData.contract,
        id: ContractData._id,
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/approvevoter", jwtVerify, async (req, res) => {
  try {
    const updateStatus = await ElectionHost.updateOne(
      {
        _id: req.body.electionId,
        "voters.walletAddress": req.body.walletAddress,
      },
      {
        $set: {
          "voters.$.approvalStatus": "Approved",
        },
      }
    );

    if (updateStatus.modifiedCount >= 1) {
      const updateUser = await User.updateOne(
        {
          walletAddress: req.body.walletAddress,
          "registerations.eId": req.body.electionId,
        },
        {
          $set: {
            "registerations.$.approvalStatus": "Permitted",
          },
        }
      );

      if (updateUser.modifiedCount >= 1) {
        return res.json({ status: "ok" });
      } else {
        return res.json({
          status: "error",
          error: "Error in updating voter data! Please contact supoort",
        });
      }
    } else {
      return res.json({
        status: "error",
        error: "Error occured in Voter add! Please contact support",
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/declinevoter", jwtVerify, async (req, res) => {
  try {
    const declineStatus = await ElectionHost.updateOne(
      {
        _id: req.body.electionId,
        "voters.walletAddress": req.body.walletAddress,
      },
      {
        $set: {
          "voters.$.approvalStatus": "Rejected",
        },
      }
    );

    if (declineStatus.modifiedCount >= 1) {
      const declineUser = await User.updateOne(
        {
          walletAddress: req.body.walletAddress,
          "registerations.eId": req.body.electionId,
        },
        {
          $set: {
            "registerations.$.approvalStatus": "Rejected",
          },
        }
      );

      if (declineUser.modifiedCount >= 1) {
        return res.json({ status: "ok" });
      } else {
        return res.json({
          status: "error",
          error: "Error in decline voter data! Please contact supoort",
        });
      }
    } else {
      return res.json({
        status: "error",
        error: "Error occured in Voter decline! Please contact support",
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/startelections", jwtVerify, async (req, res) => {
  try {
    const startElection = await ElectionHost.updateOne(
      {
        email: req.body.email,
      },
      {
        $set: {
          electionStatus: "Started",
        },
      }
    );

    if (startElection.modifiedCount >= 1) {
      return res.json({ status: "ok" });
    } else {
      return res.json({
        status: "error",
        error: "Error in starting election! Please contact support",
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/approvedvoters", jwtVerify, async (req, res) => {
  try {
    const approvedVoters = await ElectionHost.findOne(
      {
        _id: req.body.electionId,
        "voters.approvalStatus": "Approved",
      },
      {
        voters: 1,
      }
    );

    if (!approvedVoters || approvedVoters === null) {
      return res.json({ status: "error", error: "Invalid Voters" });
    } else {
      return res.json({ status: "ok", approvedvoters: approvedVoters });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sever started on PORT ${PORT}`);
});
