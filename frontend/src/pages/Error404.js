import React from "react";
import MatrixParallax from "react-matrix-parallax";

const Error404 = (props) => {
  return (
    <React.Fragment>
      <MatrixParallax color="#00AA00" backgroundColor="rgba(0,0,0,1)">
        <div style={{ fontSize: "1.9rem" }}>
          <h2 style={{ marginLeft: props.errorcode === "404" ? "25%" : "40%" }}>
            {props.errorcode}
          </h2>
          <h5 style={{ maxWidth: "100vw" }}>{props.message}</h5>
        </div>
      </MatrixParallax>
    </React.Fragment>
  );
};

export default Error404;
