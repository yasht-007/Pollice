import "./App.css";
import { useState, useEffect } from "react";
import { ElectionHostState } from "./Components/HostContext";
import HeaderComponent from "./Components/Header/HeaderComponent";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { login, setLogin } = ElectionHostState();

  useEffect(() => {
    if(localStorage.getItem("token")){
      setLogin(localStorage.getItem("token"));
    }
  }, [login]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="*"
            element={login == "" ? <Login /> : <HeaderComponent />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
