const solc = require("solc");
const path = require("path");

// file system - read and write files to your computer
var fs = require("fs");

// web3 interface
var Web3 = require("web3");

const solpath = path.resolve(__dirname, "./Election.sol");

var fileContent = fs.readFileSync(solpath, "UTF-8").toString();
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

const deployContract = () => {
  // Web3 = web3Data;
  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  const ABI = output.contracts["Election.sol"]["Election"].abi;
  //console.log("ABI: ", ABI);

  const bytecode =
    output.contracts["Election.sol"]["Election"].evm.bytecode.object;
  //console.log("Bytecode: ", bytecode);

  const deployedDetails = {
    ABI: ABI,
    bytecode: bytecode,
  };

  //console.log(deployedDetails.ABI);

  return deployedDetails;
};

module.exports = deployContract;
