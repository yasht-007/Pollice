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

  return (
    <>
      <Host.Provider value={{ login, setLogin, host, setHost }}>
        {children}
      </Host.Provider>
    </>
  );
};

export default HostContext;

export const ElectionHostState = () => {
  return useContext(Host);
};
