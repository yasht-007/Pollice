import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Alert from "./components/Alert";
import Registeration from "./pages/Registeration";
import ElectionForm from "./components/ElectionForm";
import VerifyHost from "./components/VerifyHost";
import Election from "./pages/Election";
import Error404 from "./pages/Error404";
import { ElectionState } from "./ElectionContext";

function App() {
  const { allowed, setAllowed } = ElectionState();

  useEffect(() => {
    if (localStorage.getItem("accountDetails")) {
      setAllowed(true);
    } else {
      console.log("No account details found");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/electionform" element={<ElectionForm />} />
        <Route
          path="/election/:_id"
          element={
            allowed ? (
              <Election />
            ) : (
              <Error404
                message="Not Authorized to access this page directly"
                errorcode="401"
              />
            )
          }
        />
        <Route path="/election/host/admin" element={<VerifyHost />} />
        <Route
          path="*"
          element={<Error404 message="Page Not Found" errorcode="404" />}
        />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
