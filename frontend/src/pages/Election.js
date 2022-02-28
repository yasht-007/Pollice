import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElectionChrono from "../components/Voting/ElectionChrono";
import Evoting from "../components/Voting/Evoting";
import HostDetails from "../components/Voting/HostDetails";
import Navbar from "../components/Voting/Navbar";
import TopCards from "../components/Voting/TopCards";
import { ElectionState } from "../ElectionContext";
import axios from "axios";
import web3 from "../config/web3";

const Election = () => {
  const { _id } = useParams();
  const {
    account,
    setAccount,
    setHost,
    setContractData,
    contractData,
    setProposal,
    setTotalVoter,
    setTotalVotes,
    setVoterStatus,
  } = ElectionState();
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setAccount(JSON.parse(localStorage.getItem("accountDetails")));
  }, []);

  useEffect(() => {
    if (account.wallet) {
      getHostData();
      getContractData();
    }
  }, [account]);

  useEffect(() => {
    if (refreshKey !== 0) {
      getCardDetails();
      getProposal();
      getVoterStatus();
    }
  }, [refreshKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getHostData = async () => {
    axios
      .post("http://localhost:5000/api/getElectionHostData", {
        id: _id,
      })
      .then((res) => {
        const ho = res.data.ehData;
        setHost({ data: ho });
      });
  };

  const getContractData = async () => {
    try {
      const cData = await axios.post(
        "http://localhost:5000/api/getContractDetails",
        {
          id: _id,
        }
      );

      if (cData.data.status === "ok") {
        setContractData(cData.data.contractData);
        setRefreshKey((refreshKey) => refreshKey + 1);
      } else {
        window.alert("Error in fetching contract data");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getProposal = async () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    contract.methods
      .proposal()
      .call()
      .then(function (result) {
        setProposal(result);
      });
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

  const getCardDetails = () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    contract.methods
      .totalVoter()
      .call()
      .then(function (result) {
        setTotalVoter(result);
      });

    contract.methods
      .totalVotes()
      .call()
      .then(function (result) {
        setTotalVotes(result);
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#111927",
          backgroundImage: `radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0,
         radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0`,
        }}
      >
        <Navbar toggle={toggle} />
        <TopCards />
        <ElectionChrono />
        <HostDetails />
        <Evoting />
      </div>
    </>
  );
};

export default Election;
