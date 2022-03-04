import { Button } from "@material-ui/core";
import React from "react";
import { AdminState } from "../../AdminContext";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const { setLogin } = AdminState();
  const history = useHistory();

  function logItOut() {
    setLogin("");
    localStorage.clear();
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
        }}
      >
        <Button
          variant="contained"
          color={"primary"}
          onClick={() => logItOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
