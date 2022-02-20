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

  const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);
  const [user, setUser] = useState(null);
  const [registered, setRegistered] = useState(false);

  const fetchElections = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:5000/api/elections")
      .then((res) => {
        setElections(res.data.elections);
        setLoading(false);
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
        setUser(res.data.voter);
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
