import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Alert from "./components/Alert";
import Registeration from "./pages/Registeration";
import ElectionForm from "./components/ElectionForm";
import VerifyHost from "./components/VerifyHost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Registeration />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/electionform" element={<ElectionForm />} exact />
        <Route path="/election/host/admin" element={<VerifyHost />} exact />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
