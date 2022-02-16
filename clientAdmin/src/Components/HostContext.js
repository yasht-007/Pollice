import React, { createContext, useContext, useState } from "react";


const Host = createContext();

const HostContext = ({ children }) => {
    const [login, setLogin] = useState("");

  return (
    <>
      <Host.Provider value={{ login, setLogin }}>
        {children}
      </Host.Provider>
    </>
  );
};

export default HostContext;

export const ElectionHostState = () => {
  return useContext(Host);
};
