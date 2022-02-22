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
      if (electionStatus !== "Not Active") {
        getRequests();
      }
    }
  }, [refreshKey, electionStatus, account]);

  useEffect(() => {
    if (electionStatus !== "Not Active" && account.wallet) {
      getContractData();
    }
  }, [account]);

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
          setPosts({ data: hosts.voters });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveVoter = async (name, email, walletAddress) => {
    //setRefreshContract(refreshContract + 1);
    // axios
    //   .post("http://localhost:5000/api/host/approvevoter", {
    //     headers: {
    //       "x-access-token": localStorage.getItem("token"),
    //     },
    //     email: localStorage.getItem("email"),
    //     voterEmail:email,
    //     walletAddress: walletAddress,
    //   })
    //   .then((res) => {
    //     if (res.data.status === "ok") {

    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    // await contract.methods
    //   .totalVoter()
    //   .call()
    //   .then((res) => {
    //     console.log(res);
    //   });

    try {
      window.alert(
        "Approving Voter! Please wait atleast 40 seconds for the transaction to be mined."
      );

      await contract.methods
        .addVoter(walletAddress, name)
        .send({
          from: contractData.walletAddress,
        })
        .then((res) => {
          //
          // console.log(res);

          // var event = contract.voterRegister(function (error, result) {
          //   if (!error) console.log(result);
          // });

          // console.log(event);
        });
    } catch (error) {
      window.alert(error.message);
    }
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
                    iconProps: { style: { fontSize: "10px", color: "green" } },
                    tooltip: "Approve",
                    onClick: (event, rowData) =>
                      approveVoter(
                        rowData.name,
                        rowData.email,
                        rowData.walletAddress
                      ),
                  },
                  {
                    icon: CloseIcon,
                    iconProps: { style: { fontSize: "14px", color: "red" } },
                    tooltip: "Reject",
                    // onClick: (event, rowData) => rejectHost(rowData.email),
                  },
                ]}
              />
            </Container>
          </>
        )}
      </Grid>
    </Box>
  );
}
