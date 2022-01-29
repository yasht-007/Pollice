import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/home" element={<Home />} exact />
      </Routes>
    </Router>
  );
}

export default App;
