import React from "react";
import { Box, Button } from "@material-ui/core";
import { AdminState } from "../../../AdminContext";

export default function Profile() {
  const { setLogin } = AdminState();

  const handleClick = (event) => {
    setLogin("");
    localStorage.clear();
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
