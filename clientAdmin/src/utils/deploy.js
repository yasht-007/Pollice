import web3 from "./web3";

import solc from "solc";

// file system - read and write files to your computer
import fs from "fs";

var fileContent = fs.readFileSync("Election.sol").toString();
// console.log(fileContent);

// create an input structure for my solidity compiler
var input = {
  language: "Solidity",
  sources: {
    "Election.sol": {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const deployContract = (deployData) => {
  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  const ABI = output.contracts["Election.sol"]["Election"].abi;
  // console.log("ABI: ", ABI);

  const bytecode =
    output.contracts["Election.sol"]["Election"].evm.bytecode.object;
  // console.log("Bytecode: ", bytecode);

  const contract = new web3.eth.Contract(ABI);
  const defaultAccount = deployData.myWalletAddress;
  console.log("Default Account:", defaultAccount); //to deploy the contract from default Account
  contract
    .deploy({
      data: bytecode,
      arguments: [
        deployData.ballotName,
        deployData.proposal,
        deployData.candidateNames,
        deployData.candidateAddresses,
      ],
    })
    .send({ from: defaultAccount, gas: 5000000 })
    .on("receipt", (receipt) => {
      //event,transactions,contract address will be returned by blockchain
      console.log("Contract Address:", receipt.contractAddress);
    });
};

export default deployContract;
