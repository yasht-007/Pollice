import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";

const Sidebar = ({ isOpen, toggle }) => {

  return (
    <SidebarContainer isOpen={isOpen} >
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>

        <SidebarLink to="/" onClick={toggle}>
            Home
          </SidebarLink>

          <SidebarLink to="aboutus" onClick={toggle}>
            About
          </SidebarLink>

          <SidebarLink to="markets" onClick={toggle}>
            Campaigns
          </SidebarLink>

          <SidebarLink to="team" onClick={toggle}>
            Team
          </SidebarLink>

          <div 
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontSize: "1.5rem",
              listStyle: "none",
              transition: "0.2 ease-in-out",
              textDecoration: "none",
              cursor: "pointer",
              color: "#fff",
            }}
          >
          </div>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
