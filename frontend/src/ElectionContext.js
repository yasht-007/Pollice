import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const Election = createContext();

const ElectionContext = ({ children }) => {
  const [account, setAccount] = useState({
    wallet: false,
    chainId: "not found",
    networkid: "not found",
    address: "Unavailable",
    balance: "0",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
    time: 2000,
  });

  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);
  const [gotElection, setGotElection] = useState(false);
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [host, setHost] = useState({
    data: {
      organizationName: "",
      email: "",
      contactNumber: "",
      regNo: "",
      typeOfOrg: "",
      purpose: "",
      address: "",
      eStartDate: "",
      eEndDate: "",
      eDeployDate: "",
      electionStatus: "",
    },
  });

  const [contractData, setContractData] = useState([]);
  const [proposal, setProposal] = React.useState("");
  const [totalvoter, setTotalVoter] = React.useState("NA");
  const [totalvotes, setTotalVotes] = React.useState("NA");
  const [voterStatus, setVoterStatus] = React.useState("Not Voted");
  const [winnerId, setWinnerId] = useState(0);
  const [winnerName, setWinnerName] = useState("");
  const [winnerAddress, setWinnerAddress] = useState("");
  const [winnerVotes, setWinnerVotes] = useState(0);

  const fetchElections = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:5000/api/elections")
      .then((res) => {
        if (res.data.status === "ok") {
          setElections(res.data.elections);
          setGotElection(true);
          setLoading(false);
        } else {
          setLoading(false);
          setGotElection(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          open: true,
          message: err.message,
          type: "error",
          time: 5000,
        });
      });
  };

  const fetchUser = async () => {
    await axios
      .post("http://localhost:5000/api/voterstatus", {
        walletAddress: account.address,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setUser(res.data.voter);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
          time: 5000,
        });
      });
  };

  return (
    <>
      <Election.Provider
        value={{
          account,
          setAccount,
          alert,
          setAlert,
          fetchElections,
          elections,
          loading,
          user,
          fetchUser,
          registered,
          setRegistered,
          host,
          setHost,
          contractData,
          setContractData,
          proposal,
          setProposal,
          totalvoter,
          setTotalVoter,
          totalvotes,
          setTotalVotes,
          voterStatus,
          setVoterStatus,
          winnerId,
          setWinnerId,
          winnerName,
          setWinnerName,
          winnerAddress,
          setWinnerAddress,
          winnerVotes,
          setWinnerVotes,
          gotElection,
          allowed,
          setAllowed,
        }}
      >
        {children}
      </Election.Provider>
    </>
  );
};

export default ElectionContext;

export const ElectionState = () => {
  return useContext(Election);
};
