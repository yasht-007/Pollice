import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AdminContext from "./AdminContext";

ReactDOM.render(
  <AdminContext>
    <App />
  </AdminContext>,
  document.getElementById("root")
);
