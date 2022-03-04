import React, { createContext, useContext, useState } from "react";
const Admin = createContext();

const AdminContext = ({ children }) => {
  const [login, setLogin] = useState("");

  return (
    <>
      <Admin.Provider
        value={{
          login,
          setLogin,
        }}
      >
        {children}
      </Admin.Provider>
    </>
  );
};

export default AdminContext;

export const AdminState = () => {
  return useContext(Admin);
};
