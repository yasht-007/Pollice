import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useStyles } from "../HeaderStyles";
import { ElectionHostState } from "../../HostContext";

export default function Profile() {
  const classes = useStyles();
  const { setLogin } = ElectionHostState();

  const handleClick = (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setLogin("");
  };

  return (
    <Box>
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
