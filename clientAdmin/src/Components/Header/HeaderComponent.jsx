import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../BodyComponent/Dashboard/Dashboard";
import ElectionComponent from "../BodyComponent/ElectionComponent";
import Candidates from "../BodyComponent/Candidates";
import Voters from "../BodyComponent/Voters";

import Logout from "../BodyComponent/Logout";
import { useStyles } from "./HeaderStyles";

export default function HeaderComponent() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
    <div>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      {/* // registerian our routes  */}
      <Box className={classes.wrapper}>
        <Routes>
          {/* <Route path='/' component={<Dashboard />} /> */}
          <Route exact path="/elections" element={<ElectionComponent />} />
          <Route exact path="/candidates" element={<Candidates />} />
          <Route exact path="/voters" element={<Voters />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Box>
    </div>
  );
}
