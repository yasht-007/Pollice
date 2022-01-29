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
import {Buttonthird} from "../ButtonElement";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

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
                  to="applyforhost"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Campaigns
                </NavLinks>
              </NavItem>

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
              </NavItem>

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
          <Buttonthird
            to=""
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            primary="true"
            dark="true"
          >
            Connect Wallet
          </Buttonthird>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
