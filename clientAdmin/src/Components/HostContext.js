import axios from "axios";
import React, { createContext, useContext, useState } from "react";
const Host = createContext();

const HostContext = ({ children }) => {
  const [login, setLogin] = useState("");
  const [host, setHost] = useState({
    data: [
      {
        organizationName: "",
        email: "",
        contactNumber: "",
        regNo: "",
        typeOfOrg: "",
        purpose: "",
        address: "",
        eStartDate: "",
        eEndDate: "",
        electionStatus: "",
      },
    ],
  });

  const [account, setAccount] = useState({
    wallet: false,
    chainId: "not found",
    networkid: "not found",
    address: "Unavailable",
    balance: "0",
  });

  const [electionStatus, setElectionStatus] = useState("");
  const [contractData, setContractData] = useState([]);

  const getContractData = async () => {
    try {
      const cData = await axios.post(
        "https://pollice-elections.herokuapp.com/api/host/getabiandcontract",
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
          email: localStorage.getItem("email"),
        }
      );

      if (cData.data.status === "ok") {
        setContractData(cData.data.contractData);
        localStorage.setItem("id", cData.data.id);
      } else {
        window.alert("Error in fetching contract data");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getElectionStatus = async () => {
    await axios
      .post("https://pollice-elections.herokuapp.com/api/host/getelectionstatus", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setElectionStatus(res.data.electionStatus);
        } else {
          window.alert("Error");
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  return (
    <>
      <Host.Provider
        value={{
          login,
          setLogin,
          host,
          setHost,
          account,
          setAccount,
          contractData,
          getContractData,
          electionStatus,
          setElectionStatus,
          getElectionStatus,
        }}
      >
        {children}
      </Host.Provider>
    </>
  );
};

export default HostContext;

export const ElectionHostState = () => {
  return useContext(Host);
};
