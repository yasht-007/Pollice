import { Button } from "@material-ui/core";
import React from "react";
import { AdminState } from "../../AdminContext";

export default function Logout() {
  const { setLogin } = AdminState();

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
