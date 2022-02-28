import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
} from "./NavbarElements";
import { Buttonthird, ButtonOutlined } from "../ButtonElement";
import { ElectionState } from "../../ElectionContext";
// import Electionabi from "../../contracts/Election.json";
import DataAddress from "../DataAddress";
import {
  checkCorrectNetwork,
  checkWalletAvailable,
  getMainBalance,
  getNetworkId,
  getUserAddress,
} from "../../config/web3Action";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const { account, setAccount, setAlert } = ElectionState();

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

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
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              Pollice.
            </NavLogo>

            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>

            <NavMenu>
              <NavItem>
                <NavLinks
                  to="/"
                  onClick={toggleHome}
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="campaigns"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Campaigns
                </NavLinks>
              </NavItem>
              {/* 
              <NavItem>
                <NavLinks
                  to="pollice"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  FAQ
                </NavLinks>
              </NavItem> */}

              <NavItem>
                <NavLinks
                  to="aboutus"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  About
                </NavLinks>
              </NavItem>

              <NavItem>
                <NavLinks
                  to="team"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Team
                </NavLinks>
              </NavItem>
            </NavMenu>
          </NavbarContainer>

          {account.wallet ? (
            <DataAddress address={account.address} />
          ) : (
            <Buttonthird
              to="/"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              onClick={connectWallet}
              primary="true"
              dark="true"
            >
              Connect
            </Buttonthird>
          )}

          {account.wallet ? (
            <ButtonOutlined to=" " onClick={disconnectWallet}>
              Log out
            </ButtonOutlined>
          ) : null}
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
