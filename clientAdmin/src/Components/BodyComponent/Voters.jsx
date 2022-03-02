import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Avatar,
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@material-ui/core";
import { PageHeader } from "../Common/CommonComponent";
import { useStyles } from "./BodyStyles";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../../utils/MaterialTableIcons";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { ElectionHostState } from "../HostContext";
import web3 from "../../utils/web3";

export default function Voters() {
  const classes = useStyles();

  const [posts, setPosts] = useState({
    data: [
      {
        name: "",
        email: "",
        aadharNumber: 0,
        walletAddress: "",
      },
    ],
  });

  const [approvedPosts, setApprovedPosts] = useState({
    data: [
      {
        name: "",
        email: "",
        aadharNumber: 0,
        walletAddress: "",
      },
    ],
  });

  const {
    contractData,
    getContractData,
    electionStatus,
    getElectionStatus,
    account,
  } = ElectionHostState();

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (account.wallet) {
      getElectionStatus();
      if (electionStatus === "Deployed") {
        getRequests();
      } else if (electionStatus === "Started" ||
      electionStatus === "Ended" ||
      electionStatus === "Result") {
        getApprovedVoters();
      }
    }
  }, [refreshKey, electionStatus, account]);

  useEffect(() => {
    if (electionStatus === "Deployed" && account.wallet) {
      getContractData();
    }
  }, [account,electionStatus]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Aadhaar No", field: "aadharNumber", type: "numeric" },
    {
      title: "Voter Address",
      field: "walletAddress",
    },
  ];

  const getRequests = async () => {
    await axios
      .post("http://localhost:5000/api/host/getvoters", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          const hosts = res.data.voters;
          setPosts({ data: hosts });
        } else {
          setPosts({ data: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateToDatabase = async (walletAddress) => {
    await axios
      .post("http://localhost:5000/api/host/approvevoter", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        electionId: localStorage.getItem("id"),
        walletAddress: walletAddress,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Voter Approved");
        } else {
          window.alert(res.data.error);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const approveVoter = async (name, walletAddress) => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    try {
      window.alert(
        "Approving Voter! Please wait atleast 40 seconds for the transaction to be mined."
      );

      await contract.methods
        .addVoter(walletAddress, name)
        .send({
          from: contractData.walletAddress,
        })
        .then((result) => {
          if (
            result.events.voterRegister !== undefined ||
            result.events.voterRegister !== null
          ) {
            updateToDatabase(walletAddress);
            setRefreshKey((refreshKey) => refreshKey + 1);
          }
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  const declineVoter = async (declineWalletAddress) => {
    await axios
      .post("http://localhost:5000/api/host/declinevoter", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        electionId: localStorage.getItem("id"),
        walletAddress: declineWalletAddress,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Voter Declined");
          setRefreshKey((refreshKey) => refreshKey + 1);
        } else {
          window.alert(res.data.error);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const getApprovedVoters = async () => {
    await axios
      .post("http://localhost:5000/api/host/approvedvoters", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        electionId: localStorage.getItem("id"),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          const hosts = res.data.approvedvoters;
          setApprovedPosts({ data: hosts.voters });
        } else {
          setApprovedPosts({ data: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className={classes.section}>
      <PageHeader label="voter" />
      <Grid container spacing={1}>
        {posts.length === 0 ? (
          <Box p={3} style={{ width: "100%", textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Container>
              {electionStatus === "Deployed" && account.wallet ? (
                <MaterialTable
                  title="Voter Management:"
                  columns={columns}
                  data={posts.data}
                  style={{
                    textAlign: "center",
                    textOverflow: "ellipsis",
                  }}
                  options={{
                    actionsCellStyle: {
                      backgroundColor: "#fff",
                      color: "red",
                    },
                    toolbar: true,
                    search: true,
                    headerStyle: {
                      backgroundColor: "black",
                      color: "white",
                      pointerEvents: "none",
                    },
                  }}
                  icons={tableIcons}
                  actions={[
                    {
                      icon: DoneIcon,
                      iconProps: {
                        style: { fontSize: "10px", color: "green" },
                      },
                      tooltip: "Approve",
                      onClick: (event, rowData) =>
                        approveVoter(rowData.name, rowData.walletAddress),
                    },
                    {
                      icon: CloseIcon,
                      iconProps: { style: { fontSize: "14px", color: "red" } },
                      tooltip: "Reject",
                      onClick: (event, rowData) =>
                        declineVoter(rowData.walletAddress),
                    },
                  ]}
                />
              ) : (
                <MaterialTable
                  title="Voter Management:"
                  columns={columns}
                  data={approvedPosts.data}
                  style={{
                    textAlign: "center",
                    textOverflow: "ellipsis",
                  }}
                  options={{
                    actionsCellStyle: {
                      backgroundColor: "#fff",
                      color: "red",
                    },
                    toolbar: true,
                    search: true,
                    headerStyle: {
                      backgroundColor: "black",
                      color: "white",
                      pointerEvents: "none",
                    },
                  }}
                  icons={tableIcons}
                />
              )}
            </Container>
          </>
        )}
      </Grid>
    </Box>
  );
}
