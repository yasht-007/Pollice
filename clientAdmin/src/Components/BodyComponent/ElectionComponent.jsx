import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  CardContent,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import Popup from "reactjs-popup";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
import { Typography } from "@material-ui/core";
import { ElectionHostState } from "../HostContext";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Person";
import AccounntBalanceIcon from "@material-ui/icons/AccountBalanceRounded";
import axios from "axios";
import web3 from "../../utils/web3";
const bytes32 = require("bytes32");

export default function ElectionComponent() {
  const classes = useStyles();
  const {
    account,
    electionStatus,
    getElectionStatus,
    contractData,
    getContractData,
  } = ElectionHostState();

  const [posts, setPosts] = useState({
    data: [
      {
        name: "",
        walletAddress: "",
      },
    ],
  });

  const [ballotName, setBallotName] = useState("");
  const [proposal, setProposal] = useState("");
  const [buttonclick, setButtonClick] = useState(false);
  const [startbuttonclick, setStartButtonClick] = useState(false);
  const [endbuttonclick, setEndButtonClick] = useState(false);
  const [resultbuttonclick, setResultButtonClick] = useState(false);
  const [isDeployed, setIsDeployed] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winnerName, setWinnerName] = useState("");
  const [winnerAddress, setWinnerAddress] = useState("");

  useEffect(() => {
    if (account.wallet && electionStatus === "Not Active") {
      getRequests();
    }
  }, [account, electionStatus]);

  useEffect(() => {
    if (account.wallet && electionStatus !== "Not Active") {
      getContractData();
    } // eslint-disable-next-line
  }, [account, electionStatus]);

  useEffect(() => {
    if (account.wallet) {
      getElectionStatus();

      if (electionStatus === "Deployed") {
        setButtonClick(true);
        setStartButtonClick(false);
        setEndButtonClick(true);
        setResultButtonClick(true);
      } else if (electionStatus === "Started") {
        getTotalVotersAndVotes();
        setButtonClick(true);
        setStartButtonClick(true);
        setEndButtonClick(false);
        setResultButtonClick(true);
      } else if (electionStatus === "Ended") {
        getTotalVotersAndVotes();
        setButtonClick(true);
        setStartButtonClick(true);
        setEndButtonClick(true);
        setResultButtonClick(false);
      } else if (electionStatus === "Result") {
        getTotalVotersAndVotes();
        setButtonClick(true);
        setStartButtonClick(true);
        setEndButtonClick(true);
        setResultButtonClick(true);
      }
    }
    // eslint-disable-next-line
  }, [isDeployed, account, electionStatus]);

  useEffect(() => {
    if (account.wallet && electionStatus === "Result") {
      getWinners();
    }
  }, [account, isDeployed, electionStatus]);

  const DisplayData = [
    {
      label: "Election Status",
      value: account.wallet ? electionStatus : "Not Connected",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Total Voters",
      value:
        account.wallet &&
        (electionStatus === "Started" ||
          electionStatus === "Ended" ||
          electionStatus === "Result")
          ? totalVoters
          : "NA",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Total Votes",
      value:
        account.wallet &&
        (electionStatus === "Started" ||
          electionStatus === "Ended" ||
          electionStatus === "Result")
          ? totalVotes
          : "NA",
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "Voting Percentage",
      value:
        account.wallet &&
        (electionStatus === "Started" ||
          electionStatus === "Ended" ||
          electionStatus === "Result")
          ? (totalVotes / totalVoters) * 100
          : "NA",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
  ];

  const contentStyle = {
    maxWidth: "600px",
    width: "60%",
    height: "55%",
    background: "#fff9d6",
    borderStyle: "solid",
    overflow: "scroll",
  };

  const getRequests = async () => {
    await axios
      .post("https://pollice-elections.herokuapp.com/api/host/getcandidate", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          const cand = res.data.cand;
          setPosts({ data: cand.candidates });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateToDatabase = async (abi, contractAddress, defaultAccount) => {
    var today = new Date();
    var month;

    var day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

    if (today.getMonth() + 1 < 10) {
      month = "0" + (today.getMonth() + 1);
    }

    var deployDate = today.getFullYear() + "-" + month + "-" + day;

    deployDate = deployDate.toString();

    await axios
      .post(
        "https://pollice-elections.herokuapp.com/api/host/setcontractandabi",
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
          email: localStorage.getItem("email"),
          abi: abi,
          contractAddress: contractAddress,
          walletAddress: defaultAccount,
          deployDate: deployDate,
        }
      )
      .then((res) => {
        if (res.data.status === "ok") {
          setStartButtonClick(true);
          window.alert("Contract Deployed Successfully");
          setIsDeployed((isDeployed) => isDeployed + 1);
        } else {
          window.alert("error");
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const deployIt = async () => {
    var abi;
    if (ballotName === "" || proposal === "") {
      alert("Please fill all the fields");
    } else {
      const cNames = [];

      for (let i = 0; i < posts.data.length; i++) {
        cNames[i] = bytes32({ input: posts.data[i].name });
      }

      const cAddresses = [];

      for (let i = 0; i < posts.data.length; i++) {
        cAddresses[i] = posts.data[i].walletAddress;
      }

      const deployData = {
        ballotName: ballotName,
        proposal: proposal,
        candidateNames: cNames,
        candidateAddresses: cAddresses,
        myWalletAddress: account.address,
      };

      await axios
        .post(
          "https://pollice-elections.herokuapp.com/api/host/deployContract",
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.status === "ok") {
            abi = res.data.abi;

            const defaultAccount = deployData.myWalletAddress;
            if (defaultAccount.length !== 42) {
              alert("Please first connect your wallet");
            } else {
              window.alert(
                "Please wait atleast 40 seconds for the contract to be deployed"
              );

              const contract = new web3.eth.Contract(res.data.abi);
              setButtonClick(true);
              contract
                .deploy({
                  data: res.data.bytecode,
                  arguments: [
                    deployData.ballotName,
                    deployData.proposal,
                    deployData.candidateNames,
                    deployData.candidateAddresses,
                  ],
                })
                .send({ from: defaultAccount, gas: 5000000 })
                .on("receipt", (receipt) => {
                  //event,transactions,contract address will be returned by blockchain

                  console.log(receipt.contractAddress);
                })
                .then((res) => {
                  setButtonClick(true);
                  updateToDatabase(abi, res._address, defaultAccount);
                })
                .catch((err) => {
                  window.alert(err.message);
                  setButtonClick(false);
                });
            }
          }
        });
    }
  };

  const updateStartStatus = async () => {
    await axios
      .post("https://pollice-elections.herokuapp.com/api/host/startelections", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Election started Successfully");
          setIsDeployed((isDeployed) => isDeployed + 1);
          setStartButtonClick(true);
        } else {
          setStartButtonClick(false);
          window.alert(res.data.error);
        }
      });
  };

  const startElection = async () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    try {
      window.alert(
        "Starting Election voting! Please wait atleast 40 seconds for the transaction to be mined."
      );

      setStartButtonClick(true);

      await contract.methods
        .startVote()
        .send({
          from: contractData.walletAddress,
        })
        .then((result) => {
          if (
            result.events.electionState !== undefined ||
            result.events.electionState !== null
          ) {
            updateStartStatus();
          }
        });
    } catch (error) {
      window.alert(error.message);
      setStartButtonClick(false);
    }
  };

  const getTotalVotersAndVotes = async () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    await contract.methods
      .totalVoter()
      .call()
      .then(function (result) {
        setTotalVoters(result);
      });

    await contract.methods
      .totalVotes()
      .call()
      .then(function (result) {
        setTotalVotes(result);
      });
  };

  const updateEndStatus = async () => {
    await axios
      .post("https://pollice-elections.herokuapp.com/api/host/endelections", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Election ended Successfully");
          setIsDeployed((isDeployed) => isDeployed + 1);
          setEndButtonClick(true);
        } else {
          setEndButtonClick(false);
          window.alert(res.data.error);
        }
      });
  };

  const endElection = async () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    try {
      window.alert(
        "Ending Election voting! Please wait atleast 40 seconds for the transaction to be mined."
      );

      setEndButtonClick(true);

      await contract.methods
        .endVote()
        .send({
          from: contractData.walletAddress,
        })
        .then((result) => {
          if (
            result.events.electionState !== undefined ||
            result.events.electionState !== null
          ) {
            updateEndStatus();
          }
        });
    } catch (error) {
      window.alert(error.message);
      setEndButtonClick(false);
    }
  };

  const updateResultStatus = async (result) => {
    await axios
      .post("https://pollice-elections.herokuapp.com/api/host/declareresult", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
        winnerWalletAddress: result,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Election result declared Successfully");
          setIsDeployed((isDeployed) => isDeployed + 1);
          setResultButtonClick(true);
        } else {
          setResultButtonClick(false);
          window.alert(res.data.error);
        }
      });
  };

  const declareResult = async () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    try {
      window.alert("Getting Election result! Please wait.");

      setResultButtonClick(true);

      await contract.methods
        .winnerAddress()
        .call()
        .then((result) => {
          // setWinnerAddress(result);
          updateResultStatus(result);
        });
    } catch (error) {
      window.alert(error.message);
      setResultButtonClick(false);
    }
  };

  const getWinners = async () => {
    try {
      const resultWinner = await axios.post(
        "https://pollice-elections.herokuapp.com/api/host/winner",
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
          email: localStorage.getItem("email"),
        }
      );

      if (resultWinner.data.status === "ok") {
        setWinnerName(resultWinner.data.winnerName);
        setWinnerAddress(resultWinner.data.winnerAddress);
      } else {
        window.alert("Error in fetching winner list please contact admin");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <>
      <Box>
        <PageHeader label="elections" pageTitle="Election Management: " />
        <Grid container spacing={1}>
          {DisplayData.map((item, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardLabel}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h6"
                    className={classes.cardTitle}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    component="p"
                    style={{
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  ></Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className={classes.epaper}>
          {/* <CircularProgress /> */}
          <Container className={classes.container}>
            <Typography variant="h5" style={{ padding: "10px", color: "blue" }}>
              Election Control :-
            </Typography>
            {electionStatus !== "Result" ? (
              <>
                <Grid className={classes.ecard}>
                  <Typography
                    variant="h6"
                    style={{ padding: "10px", color: "black" }}
                  >
                    Ballot Name :-
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ padding: "5px" }}
                    size="small"
                    disabled={buttonclick === false ? "" : "disabled"}
                    onChange={(e) => setBallotName(e.target.value)}
                  />
                </Grid>
                <Grid className={classes.ecard}>
                  <Typography
                    variant="h6"
                    style={{ padding: "10px", color: "black" }}
                  >
                    Proposal :-
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    style={{ padding: "5px", minWidth: "40vw" }}
                    size="small"
                    disabled={buttonclick === false ? "" : "disabled"}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </Grid>
                <Grid className={classes.ecard}>
                  <Typography
                    variant="h6"
                    style={{ padding: "10px", color: "black" }}
                  >
                    Candidate Names :-
                  </Typography>

                  <Popup
                    trigger={
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={buttonclick}
                        style={{
                          height: "4ch",
                          marginTop: "10px",
                          textTransform: "none",
                        }}
                      >
                        See List
                      </Button>
                    }
                    onOpen={() => getRequests()}
                    modal
                    contentStyle={contentStyle}
                  >
                    {(close) => (
                      <Container
                        className={classes.container}
                        style={{ alignItems: "center" }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            padding: "10px",
                            color: "black",
                          }}
                        >
                          Candidate List :-
                        </Typography>

                        {posts.data.map((item, i) => {
                          return (
                            <>
                              <List
                                sx={{
                                  width: "100%",
                                  maxWidth: 360,
                                  bgcolor: "background.paper",
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                              >
                                <ListItemIcon>
                                  <InboxIcon />
                                  <ListItemText primary={item.name} />
                                </ListItemIcon>
                              </List>
                            </>
                          );
                        })}

                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            close();
                          }}
                        >
                          Confirm
                        </Button>
                      </Container>
                    )}
                  </Popup>
                </Grid>
                <Grid className={classes.ecard}>
                  <Typography
                    variant="h6"
                    style={{ padding: "10px", color: "black" }}
                  >
                    Candidate Addresses :-
                  </Typography>
                  <Popup
                    trigger={
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={buttonclick}
                        style={{
                          height: "4ch",
                          marginTop: "10px",
                          textTransform: "none",
                        }}
                      >
                        See List
                      </Button>
                    }
                    modal
                    contentStyle={contentStyle}
                    onOpen={() => getRequests()}
                  >
                    {(close) => (
                      <Container
                        className={classes.container}
                        style={{ alignItems: "center" }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            padding: "10px",
                            color: "black",
                          }}
                        >
                          Candidate Addresses :-
                        </Typography>

                        {posts.data.map((item, i) => {
                          return (
                            <>
                              <List
                                sx={{
                                  width: "100%",
                                  maxWidth: 360,
                                  bgcolor: "background.paper",
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                              >
                                <ListItemIcon>
                                  <AccounntBalanceIcon />
                                  <ListItemText primary={item.walletAddress} />
                                </ListItemIcon>
                              </List>
                            </>
                          );
                        })}
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            close();
                          }}
                        >
                          Confirm
                        </Button>
                      </Container>
                    )}
                  </Popup>
                </Grid>
              </>
            ) : (
              <>
                <Grid className={classes.ecard}>
                  <Typography
                    variant="h6"
                    style={{ padding: "10px", color: "black" }}
                  >
                    Winner Name :-
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{ padding: "5px", marginTop: "6px" }}
                  >
                    {winnerName}
                  </Typography>
                </Grid>

                <Grid className={classes.ecard}>
                  <Typography
                    variant="h6"
                    style={{ padding: "10px", color: "black" }}
                  >
                    Winner Address :-
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      padding: "5px",
                      marginTop: "6px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "30ch",
                    }}
                  >
                    {winnerAddress}
                  </Typography>
                </Grid>
              </>
            )}
          </Container>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
              disabled={buttonclick}
              onClick={deployIt}
            >
              Deploy
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
              disabled={startbuttonclick}
              onClick={() => {
                startElection();
              }}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
              disabled={endbuttonclick}
              onClick={() => endElection()}
            >
              End
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
              disabled={resultbuttonclick}
              onClick={() => declareResult()}
            >
              Result
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
}
