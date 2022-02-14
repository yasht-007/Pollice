import web3 from "./web3";

//Check wallet available
export const checkWalletAvailable = () => {
  if (typeof window.ethereum !== "undefined") {
    if (window.ethereum && window.ethereum.isMetaMask) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//Check correct network Id
export const checkCorrectNetwork = async () => {
  let chainID;
  chainID = await web3.eth.getChainId();
  return chainID;
};

//get correct network Id
export const getNetworkId = async () => {
  let netId;
  netId = await web3.eth.net.getId();
  return netId;
};

//Get User Address from Web3
export const getUserAddress = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const accountAddress = accounts[0];
  return accountAddress;
};

// GET Main Token Balance
export const getMainBalance = async () => {
  let address = await getUserAddress();
  let balance = await web3.eth.getBalance(address);
  let mainBalance = web3.utils.fromWei(balance);
  return mainBalance;
};
