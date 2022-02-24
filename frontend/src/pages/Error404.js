import React from "react";
import MatrixParallax from "react-matrix-parallax";

const Error404 = () => {
  return (
    <React.Fragment>
      <MatrixParallax color="#00AA00" backgroundColor="rgba(0,0,0,1)">
        <div style={{ fontSize: "1.9rem" }}>
          <h2 style={{marginLeft:"25%"}}>404</h2>
          <h5 style={{ maxWidth: "100vw" }}>Page Not Found</h5>
        </div>
      </MatrixParallax>
    </React.Fragment>
  );
};

export default Error404;
