import React, { useState } from "react";
import styled from "styled-components";
import Front from "./Front";
import Back from "./Back";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    color: "#fff",
    border: "2px solid #fff",
    maxWidth: "12ch",
    width: "auto",
    height: "auto",
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(7),
    textTransform: "capitalize",
  },
}));

const HostDetails = () => {
  const classes = useStyles();
  const [rotate, setRotate] = useState(true);

  const handleOnClick = () => {
    setRotate((prevState) => !prevState);
  };

  return (
    <>
      <Typography variant="h5" className={classes.pageTitle}>
        &nbsp;Election Host&nbsp;
      </Typography>
      <Section>
        <Card>
          <FaceFront rotate={rotate} onClick={handleOnClick}>
            <Front />
          </FaceFront>
          <FaceBack rotate={rotate} onClick={handleOnClick}>
            <Back />
          </FaceBack>
        </Card>
      </Section>
    </>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1c1c25;

  ::before {
    content: "";
    position: absolute;
    bottom: auto;
    right: 50%;
    width: 100vw;
    height: 110vh;
    background: linear-gradient(#f00, #f0f);
    border-radius: 50%;
  }
`;

const Card = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  transform-style: preserve-3d;
  perspective: 500px;
`;

const Face = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  transition: 1s;
  backface-visibility: hidden;
`;
const FaceFront = styled(Face)`
  transform: ${(props) => (!props.rotate ? `rotateY(180deg)` : "")};
`;
const FaceBack = styled(Face)`
  transform: ${(props) =>
    props.rotate ? `rotateY(180deg)` : "rotateY(360deg)"};
`;

export default HostDetails;
