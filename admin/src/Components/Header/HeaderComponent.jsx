import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../BodyComponent/Dashboard/Dashboard";
import ElectionComponent from "../BodyComponent/ElectionComponent";
import Elections from "../BodyComponent/Elections";
import Users from "../BodyComponent/Users";

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
        <Switch>
          {/* <Route path='/' component={<Dashboard />} /> */}
          <Route exact path="/requests" render={() => <ElectionComponent />} />
          <Route exact path="/elections" render={() => <Elections />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route exact path="/" render={() => <Dashboard />} />
        </Switch>
      </Box>
    </div>
  );
}
