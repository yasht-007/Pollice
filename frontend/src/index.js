import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ElectionContext from "./ElectionContext";

ReactDOM.render(
  <React.StrictMode>
    <ElectionContext>
      <App />
    </ElectionContext>
  </React.StrictMode>,
  document.getElementById("root")
);
