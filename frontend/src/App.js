import "./App.css";
import React, { useEffect,useSyate } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages";
import Electionabi from "./contracts/Election.json";

const Web3 = require("web3");

function App() {

  const [curentAccount, setcurentAccount] = useState("");

  useEffect(() => {
    loadweb3();
    loadBlockchainData();
  }, []);

  const loadweb3 = async () => {
    if (window.ethereum) {
      window.loadweb3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.loadweb3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.loadweb3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setcurentAccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
    } else {
      window.alert("Election contract not deployed to detected network.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/home" element={<Home />} exact />
      </Routes>
    </Router>
  );
}

export default App;
