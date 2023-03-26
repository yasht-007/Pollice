const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/voter.modal");
const Admin = require("./models/admin.modal");
const ElectionHost = require("./models/electionHost.modal");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const sendEmail = require("./config/sendEmail");
const sendRejectEmail = require("./config/sendRejectEmail");
const jwtVerify = require("./config/JwtVerify");
const deployContract = require("./config/deploy");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Pollice is running!");
});

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      aadharNumber: req.body.aadharNumber,
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
      eResultDate: req.body.resultdate,
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
        eResultDate: host.eResultDate,
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
          eDeployDate: req.body.deployDate,
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
          { electionStatus: "Deployed" },
          { electionStatus: "Started" },
          { electionStatus: "Ended" },
          { electionStatus: "Result" },
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

    res.header("Access-Control-Allow-Origin", "*");

    if (!elections || elections === null || elections.length === 0) {
      return res.json({ status: "error", error: "No elections found" });
    } else {
      return res.json({ status: "ok", elections: elections });
    }
  } catch (error) {
    res.header("Access-Control-Allow-Origin", "*");
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
      var vList = [];
      for (let i = 0; i < voters.voters.length; i++) {
        if (voters.voters[i].approvalStatus === "Pending") {
          vList.push(voters.voters[i]);
        }
      }
      return res.json({ status: "ok", voters: vList });
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
        email: req.body.email,
        "voters.approvalStatus": "Approved",
      },
      {
        voters: 1,
      }
    );

    if (!approvedVoters || approvedVoters === null) {
      return res.json({ status: "error", error: "Invalid Voters" });
    } else {
      var vList = [];
      for (let i = 0; i < approvedVoters.voters.length; i++) {
        if (approvedVoters.voters[i].approvalStatus === "Approved") {
          vList.push(approvedVoters.voters[i]);
        }
      }
      return res.json({ status: "ok", approvedvoters: vList });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/getElectionHostData", async (req, res) => {
  const ehData = {
    organizationName: "",
    email: "",
    contactNumber: "",
    regNo: "",
    typeOfOrg: "",
    purpose: "",
    address: "",
    eStartDate: "",
    eEndDate: "",
    eResultDate: "",
    eDeployDate: "",
    electionStatus: "",
  };

  try {
    const getHost = await ElectionHost.findOne(
      { _id: req.body.id },
      {
        organizationName: 1,
        email: 1,
        contactNumber: 1,
        regNo: 1,
        typeOfOrg: 1,
        purpose: 1,
        address: 1,
        eStartDate: 1,
        eEndDate: 1,
        eResultDate: 1,
        eDeployDate: 1,
        electionStatus: 1,
      }
    );

    if (!getHost || getHost === null) {
      return res.json({ status: "error", error: "Invalid Host Data" });
    } else {
      ehData.organizationName = getHost.organizationName;
      ehData.email = getHost.email;
      ehData.contactNumber = getHost.contactNumber;
      ehData.regNo = getHost.regNo;
      ehData.typeOfOrg = getHost.typeOfOrg;
      ehData.purpose = getHost.purpose;
      ehData.address = getHost.address;
      ehData.eStartDate = getHost.eStartDate;
      ehData.eEndDate = getHost.eEndDate;
      ehData.eResultDate = getHost.eResultDate;
      ehData.eDeployDate = getHost.eDeployDate;
      ehData.electionStatus = getHost.electionStatus;
      return res.json({ status: "ok", ehData: ehData });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/getContractDetails", async (req, res) => {
  try {
    const ContractData = await ElectionHost.findOne(
      {
        _id: req.body.id,
      },
      {
        contract: 1,
      }
    );

    if (!ContractData || ContractData === null) {
      return res.json({ status: "error", error: "Invalid Contract Data" });
    } else {
      return res.json({
        status: "ok",
        contractData: ContractData.contract,
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/getCandidates", async (req, res) => {
  try {
    const getCandidates = await ElectionHost.findOne(
      { _id: req.body.id },
      {
        candidates: 1,
      }
    );

    if (!getCandidates || getCandidates === null) {
      return res.json({ status: "error", error: "Invalid Candidates" });
    } else {
      var cNo = 1;
      for (let i = 0; i < getCandidates.candidates.length; i++) {
        getCandidates.candidates[i].cId = cNo++;
      }
      return res.json({ status: "ok", candidates: getCandidates.candidates });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/election/getmyvotingstatus", async (req, res) => {
  try {
    const getVoteStatus = await ElectionHost.findOne(
      {
        _id: req.body.id,
        "voters.walletAddress": req.body.walletAddress,
      },
      {
        "voters.$": 1,
      }
    );

    if (getVoteStatus) {
      return res.json({
        status: "ok",
        voteIStatus: getVoteStatus.voters[0].voted,
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/election/vote", async (req, res) => {
  try {
    const doVote = await ElectionHost.updateOne(
      {
        _id: req.body.id,
        "voters.walletAddress": req.body.walletAddress,
      },
      {
        $set: {
          "voters.$.voted": true,
        },
      }
    );

    if (doVote.modifiedCount >= 1) {
      return res.json({ status: "ok" });
    } else {
      return res.json({
        status: "error",
        error: "Error in voting! Please contact support",
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/endelections", jwtVerify, async (req, res) => {
  try {
    const endVote = await ElectionHost.updateOne(
      {
        email: req.body.email,
      },
      {
        $set: {
          electionStatus: "Ended",
        },
      }
    );

    if (endVote.modifiedCount >= 1) {
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

app.post("/api/host/declareresult", jwtVerify, async (req, res) => {
  try {
    const getResult = await ElectionHost.updateOne(
      {
        email: req.body.email,
      },
      {
        $set: {
          electionStatus: "Result",
          winnerWalletAddress: req.body.winnerWalletAddress,
        },
      }
    );

    if (getResult.modifiedCount >= 1) {
      return res.json({ status: "ok" });
    } else {
      return res.json({
        status: "error",
        error: "Error in declaring election result! Please contact support",
      });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/host/winner", jwtVerify, async (req, res) => {
  try {
    const getWinnerAddress = await ElectionHost.findOne(
      {
        email: req.body.email,
      },
      {
        winnerWalletAddress: 1,
      }
    );
    if (getWinnerAddress !== null || getWinnerAddress !== undefined) {
      const getWinner = await ElectionHost.findOne(
        {
          email: req.body.email,
          "candidates.walletAddress": getWinnerAddress.winnerWalletAddress,
        },
        {
          "candidates.$": 1,
        }
      );

      if (getWinner !== null || getWinner !== undefined) {
        return res.json({
          status: "ok",
          winnerName: getWinner.candidates[0].name,
          winnerAddress: getWinner.candidates[0].walletAddress,
        });
      }
    } else {
      return res.json({ status: "error" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.post("/api/checkadmin", async (req, res) => {
  try {
    const adminFetch = await Admin.findOne();
    if (adminFetch.key === req.body.key) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "error" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.get("/api/admin/elections", async (req, res) => {
  try {
    const elections = await ElectionHost.find(
      {
        status: "approved",
      },
      {
        _id: 1,
        email: 1,
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

app.get("/api/admin/users", async (req, res) => {
  try {
    const Users = await User.find(
      {},
      {
        _id: 1,
        email: 1,
        name: 1,
        aadharNumber: 1,
        walletAddress: 1,
      }
    );

    if (!Users || Users === null || Users.length === 0) {
      return res.json({ status: "error", error: "No user found" });
    } else {
      return res.json({ status: "ok", users: Users });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

app.get("/api/admin/getstats", async (req, res) => {
  var A, B, C, D;
  try {
    const totalHosts = await ElectionHost.find({
      status: "approved",
    });

    if (totalHosts.length === 0) {
      A = 0;
    } else {
      A = totalHosts.length;
    }

    const totalActiveHosts = await ElectionHost.find({
      status: "approved",
      $or: [{ electionStatus: "Deployed" }, { electionStatus: "Started" }],
    });

    if (totalActiveHosts.length === 0) {
      B = 0;
    } else {
      B = totalActiveHosts.length;
    }

    const completedCampaigns = await ElectionHost.find({
      status: "approved",
      electionStatus: "Result",
    });

    if (completedCampaigns.length === 0) {
      C = 0;
    } else {
      C = completedCampaigns.length;
    }

    const totalUsers = await User.find();

    if (totalUsers.length === 0) {
      D = 0;
    } else {
      D = totalUsers.length;
    }

    return res.json({
      hosts: A,
      activeHosts: B,
      completedCampaigns: C,
      totalUsers: D,
    });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sever started on PORT ${PORT}`);
});
