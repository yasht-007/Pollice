import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ElectionState } from "../../ElectionContext";
import { ButtonVote } from "../ButtonElement";
import web3 from "../../config/web3";
import { checkWalletAvailable } from "../../config/web3Action";

const useStyles = makeStyles((theme) => ({
  space: {
    background:
      "linear-gradient(130deg, #ac1a2a, #1f1fb2 41.07%, #bb2dfd 76.05%)",
    minHeight: "50vh",
    margin: "0",

    "@media screen and (max-width: 768px)": {
      width: "auto",
      height: "auto",
    },
  },

  pageTitle: {
    color: "#fff",
    border: "2px solid #fff",
    maxWidth: "11ch",
    width: "auto",
    height: "auto",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textTransform: "capitalize",
  },
  container: {
    margin: "1.5vw",
    height: "auto",
    backgroundColor: "#aaa3",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "rgba(190, 190, 190, 0.3)",
    borderRadius: "10px",
    backdropFilter: "blur(20px)",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),

    "@media screen and (max-width: 768px)": {
      justifyContent: "center",
    },
  },
  card: {
    margin: "1.5vw",
    padding: "1vw",
    width: "28vw",
    backgroundColor: "#1113",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
    color: "#eeec",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "#3333",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    fontFamily: "sans-serif",
    flexShrink: "1",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: ".3s ease all",

    "&:hover": {
      transform: "scale(1.01)",
    },

    "@media screen and (max-width: 768px)": {
      width: "60vw",
    },
  },

  cardProposal: {
    margin: "1.5vw",
    padding: "1vw",
    minwidth: "auto",
    maxWidth: "110vw",
    alignSelf: "center",
    backgroundColor: "#1113",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
    color: "#eeec",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "#3333",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    fontFamily: "sans-serif",
    flexShrink: "1",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: ".3s ease all",

    "&:hover": {
      transform: "scale(1.01)",
    },

    "@media screen and (max-width: 768px)": {
      minWidth: "auto",
      maxWidth: "70vw",
    },
  },
}));

const Evoting = () => {
  const classes = useStyles();
  const { _id } = useParams();
  const {
    account,
    proposal,
    setAlert,
    contractData,
    setVoterStatus,
    voterStatus,
    host,
  } = ElectionState();
  const [candidates, setCandidates] = React.useState([]);
  const [cAddress, setCAddress] = React.useState("");
  const [refreshKey, setRefreshKey] = React.useState(0);

  useEffect(() => {
    if (account.wallet) {
      getCandidates();
      checkAddress();
    }
    // eslint-disable-next-line 
  }, [account]);

  useEffect(() => {
    if (refreshKey !== 0) {
      getVoterStatus();
    }// eslint-disable-next-line 
  }, [refreshKey]);

  const getCandidates = async () => {
    try {
      const getCandidateData = await axios.post(
        "http://localhost:5000/api/getCandidates",
        {
          id: _id,
        }
      );

      if (getCandidateData.data.status === "ok") {
        setCandidates(getCandidateData.data.candidates);
      } else {
        setAlert({
          open: true,
          message: "error in getting candidates",
          type: "error",
          time: 5000,
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
        time: 5000,
      });
    }
  };

  async function checkAddress() {
    try {
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          setCAddress(res[0]);
        });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
        time: 5000,
      });
    }
  }

  const updateToDatabase = async () => {
    const voteStats = await axios.post(
      "http://localhost:5000/api/election/vote",
      {
        id: _id,
        walletAddress: account.address,
      }
    );

    if (voteStats.data.status === "ok") {
      setAlert({
        open: true,
        message: "You have successfully voted",
        type: "success",
        time: 5000,
      });

      setRefreshKey((refreshKey) => refreshKey + 1);
    } else {
      setAlert({
        open: true,
        message: voteStats.data.error,
        type: "error",
        time: 5000,
      });
    }
  };

  const voteCandidate = async (candidateId, candidateName) => {
    if (
      window.confirm(
        "Please confirm that your metamask wallet is unlocked in metamask extension. I am Sure that my metamask wallet is unlocked!"
      )
    ) {
      if (checkWalletAvailable()) {
        if (
          cAddress ===
          JSON.parse(localStorage.getItem("accountDetails")).address
        ) {
          const abi = contractData.abi;
          const contractaddress = contractData.contractAddress;
          const contract = new web3.eth.Contract(abi, contractaddress);

          await contract.methods
            .doVote(candidateId, candidateName)
            .send({
              from: account.address,
            })
            .then((result) => {
              if (
                result.events.electionVoteUpdate !== undefined ||
                result.events.electionVoteUpdate !== null
              ) {
                updateToDatabase();
              }
            });
        } else {
          setAlert({
            open: true,
            message: "You are not allowed to vote",
            type: "error",
            time: 5000,
          });
        }
      } else {
        setAlert({
          open: true,
          message:
            "Metamask wallet is not available in your browser please install it then try again",
          type: "error",
          time: 6000,
        });
      }
    } else {
      setAlert({
        open: true,
        message:
          "Please ensure that your metamask wallet is unlocked before voting",
        type: "warning",
        time: 5000,
      });
    }
  };

  const getVoterStatus = async () => {
    const voteStatus = await axios.post(
      "http://localhost:5000/api/election/getmyvotingstatus",
      {
        id: _id,
        walletAddress: account.address,
      }
    );

    if (voteStatus.data.status === "ok") {
      if (voteStatus.data.voteIStatus === true) {
        setVoterStatus("Voted");
      } else {
        setVoterStatus("Not Voted");
      }
    }
  };

  return (
    <div className={classes.space} id="votingpanel">
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "60px" }}
      >
        <Typography variant="h5" className={classes.pageTitle}>
          &nbsp;Voting Zone&nbsp;
        </Typography>

        <div className={classes.cardProposal}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Typography
              variant="h5"
              style={{
                color: "#fff",
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
            >
              Voting Proposal:
            </Typography>
            &nbsp; &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                color: "#fff",
                fontFamily: "Montserrat",
                fontWeight: "400",
              }}
            >
              {proposal}
            </Typography>
          </div>
        </div>
        <div className={classes.container} id="ctn_1">
          {candidates.map((candidate, index) => {
            return (
              <div className={classes.card}>
                <h1 style={{ color: "#FEE3EC" }}>#Candidate Info</h1>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <Typography variant="h5">Identification No:&nbsp;</Typography>
                  <Typography variant="h5">{candidate.cId}</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="h5">Name:&nbsp; </Typography>
                  <Typography variant="h5">{candidate.name}</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="h5">Address:&nbsp; </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {candidate.walletAddress}
                  </Typography>
                </div>

                <div
                  style={{
                    flexDirection: "row",
                    marginTop: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    display:
                      host.data.electionStatus === "Started" ? "flex" : "none",
                    cursor:
                      voterStatus === "Not Voted" ? "pointer" : "not-allowed",
                  }}
                >
                  <ButtonVote
                    onClick={() => voteCandidate(candidate.cId, candidate.name)}
                    style={{
                      pointerEvents: voterStatus === "Voted" ? "none" : "auto",
                      cursor: voterStatus === "Voted" ? "not-allowed" : "auto",
                    }}
                  >
                    Vote Candidate
                  </ButtonVote>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Evoting;
