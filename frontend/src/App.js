import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Alert from "./components/Alert";
import Registeration from "./pages/Registeration";
import ElectionForm from "./components/ElectionForm";
import VerifyHost from "./components/VerifyHost";
import Election from "./pages/Election";
import Error404 from "./pages/Error404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/electionform" element={<ElectionForm />} />
        <Route path="/election/:_id" element={<Election />} />
        <Route path="/election/host/admin" element={<VerifyHost />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
