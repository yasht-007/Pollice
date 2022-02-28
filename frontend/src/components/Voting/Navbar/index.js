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
import DataAddress from "../../DataAddress";

import { useNavigate, useParams } from "react-router-dom";
import { ElectionState } from "../../../ElectionContext";

const Navbar = ({ toggle }) => {
  const {account} = ElectionState();
  const { _id } = useParams();
  const [scrollNav, setScrollNav] = useState(false);
  const navigate = useNavigate();

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
    navigate("/");
    scroll.scrollToTop();
  };

  const toggleTop = () => {
    scroll.scrollToTop();
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
                  to=""
                  onClick={toggleTop}
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
                  to="timeline"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Timeline
                </NavLinks>
              </NavItem>

              <NavItem>
                <NavLinks
                  to="votingpanel"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Vote
                </NavLinks>
              </NavItem>
              <DataAddress address={account.address} />
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
