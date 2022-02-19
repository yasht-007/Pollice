import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "../HeaderStyles";
import { ElectionHostState } from "../../HostContext";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getMainBalance,
  getNetworkId,
  getUserAddress,
} from "../../../utils/web3Action";

export default function Profile() {
  const classes = useStyles();
  const { setLogin, account, setAccount } = ElectionHostState();

  const handleClick = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setLogin("");
  };

  const showAlert = (connect) => {
    if (connect) {
      window.alert("Wallet connected !");
    } else {
      window.alert("Wallet disconnected !");
    }
  };

  const connectWallet = async () => {
    let wallet = await checkWalletAvailable();
    let address = await getUserAddress();
    let balance = await getMainBalance();
    let chainID = await checkCorrectNetwork();
    let networkId = await getNetworkId();

    setAccount(
      {
        wallet: wallet,
        chainId: chainID,
        networkId: networkId,
        address: address,
        balance: balance,
      },
      showAlert(true)
    );

  };

  const disconnectWallet = () => {
    setAccount(
      {
        wallet: false,
        chainId: "not found",
        netWorkId: "not found",
        address: "Unavailable",
        balance: "0",
      },
      showAlert(false)
    );
  };

  return (
    <Box>
      {account.wallet ? (
        <Typography
          variant="subtitle"
          style={{
            color: "white",
            width: "8ch",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginRight: "10px",
          }}
        >
          {account.address}
        </Typography>
      ) : (
        <Button
          variant="contained"
          onClick={connectWallet}
          style={{ width: "7vw", maxWidth: "10vw", marginRight: "20px" }}
        >
          Connect
        </Button>
      )}

      {account.wallet ? (
        <Button
          variant="text"
          style={{
            color: "white",
            width: "8vw",
            maxWidth: "10vw",
            marginRight: "20px",
          }}
          onClick={disconnectWallet}
        >
          Disconnect
        </Button>
      ) : null}
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        style={{ color: "#fff", textTransform: "none" }}
        onClick={handleClick}
      >
        Log out
      </Button>
    </Box>
  );
}
