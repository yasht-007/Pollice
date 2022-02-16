import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import HostContext from "./Components/HostContext";

ReactDOM.render(
  <HostContext>
    <App />
  </HostContext>,
  document.getElementById("root")
);
