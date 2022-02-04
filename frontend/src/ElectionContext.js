import React, { createContext, useContext, useState } from "react";

const Election = createContext();

const ElectionContext = ({ children }) => {
  const [account, setAccount] = useState({
    wallet: false,
    chainId: "not found",
    address: "Unavailable",
    balance: "0",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  
  return (
    <>
      <Election.Provider value={{ account, setAccount, alert, setAlert }}>
        {children}
      </Election.Provider>
    </>
  );
};

export default ElectionContext;

export const ElectionState = () => {
  return useContext(Election);
};
