import Web3 from "web3";

var web3;

if (typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      "https://ropsten.infura.io/v3/e4ff61928cc6482d8e5170ce6d4a510d"
    )
  );
}

export default web3;
