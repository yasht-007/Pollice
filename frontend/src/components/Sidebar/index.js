import React from "react";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getMainBalance,
  getNetworkId,
  getUserAddress,
} from "../../config/web3Action";
import { ElectionState } from "../../ElectionContext";
import DataAddress from "../DataAddressS";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
  const { account, setAccount, setAlert } = ElectionState();

  const showAlert = (connect) => {
    if (connect) {
      setAlert({
        open: true,
        type: "success",
        message: " Wallet connected !",
        time: 2000,
      });
    } else {
      setAlert({
        open: true,
        type: "success",
        message: "Wallet disconnected !",
        time: 2000,
      });
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
    <SidebarContainer isOpen={isOpen}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            Home
          </SidebarLink>

          <SidebarLink to="campaigns" onClick={toggle}>
            Campaigns
          </SidebarLink>

          <SidebarLink to="aboutus" onClick={toggle}>
            About
          </SidebarLink>

          <SidebarLink to="team" onClick={toggle}>
            Team
          </SidebarLink>

          <div
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {account.wallet ? (
              <DataAddress address={account.address} />
            ) : (
              <div
                style={{
                  fontSize: "1.5rem",
                  listStyle: "none",
                  transition: "0.2 ease-in-out",
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={connectWallet}
              >
                Connect
              </div>
            )}
            {account.wallet ? (
              <div
                style={{
                  fontSize: "1.5rem",
                  listStyle: "none",
                  transition: "0.2 ease-in-out",
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={disconnectWallet}
              >
                Disconnect
              </div>
            ) : null}
          </div>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
