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
import Result from "../components/Voting/Result";

const Election = () => {
  const { _id } = useParams();
  const {
    account,
    setAccount,
    host,
    setHost,
    setContractData,
    contractData,
    setProposal,
    setTotalVoter,
    setTotalVotes,
    setVoterStatus,
    setWinnerId,
    setWinnerName,
    setWinnerAddress,
    setWinnerVotes,
  } = ElectionState();
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setAccount(JSON.parse(localStorage.getItem("accountDetails")));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (account.wallet) {
      getHostData();
      getContractData();
    } // eslint-disable-next-line
  }, [account]);

  useEffect(() => {
    if (refreshKey !== 0) {
      getCardDetails();
      getProposal();
      getVoterStatus();
    } // eslint-disable-next-line
  }, [refreshKey]);

  useEffect(() => {
    if (account.wallet && host.data.electionStatus === "Result" && refreshKey !== 0) {
      getAllCardDetails();
    } // eslint-disable-next-line
  }, [account, host,refreshKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getHostData = async () => {
    axios
      .post("https://pollice-election.herokuapp.com/api/getElectionHostData", {
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
        "https://pollice-election.herokuapp.com/api/getContractDetails",
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
      "https://pollice-election.herokuapp.com/api/election/getmyvotingstatus",
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

  const getAllCardDetails = async () => {
    const abi = contractData.abi;
    const address = contractData.contractAddress;
    const contract = new web3.eth.Contract(abi, address);

    try {
      contract.methods
        .winnerId()
        .call()
        .then(function (result) {
          setWinnerId(result);
        });

      contract.methods
        .winnerName()
        .call()
        .then(function (result) {
          setWinnerName(result);
        });

        contract.methods
        .winnerAddress()
        .call()
        .then(function (result) {
          setWinnerAddress(result);
        });

        contract.methods
        .winnerVotes()
        .call()
        .then(function (result) {
          setWinnerVotes(result);
        });

    } catch (error) {
      window.alert(error.message);
    }
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
        {host.data.electionStatus === "Result" ? <Result /> : null}
      </div>
    </>
  );
};

export default Election;
