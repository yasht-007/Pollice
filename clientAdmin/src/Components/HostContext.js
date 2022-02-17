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

  return (
    <>
      <Host.Provider value={{ login, setLogin, host, setHost, account, setAccount }}>
        {children}
      </Host.Provider>
    </>
  );
};

export default HostContext;

export const ElectionHostState = () => {
  return useContext(Host);
};
