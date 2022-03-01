import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import styled from "styled-components";
import Front from "./ResultFront";
import Back from "./ResultBack";

const useStyles = makeStyles((theme) => ({
  space: {
    backgroundColor: "#111927",
    backgroundImage: `radial-gradient(
      at 47% 33%,
      hsl(162, 77%, 40%) 0,
      transparent 59%
    ),
    radial-gradient(at 82% 65%, hsl(218, 39%, 11%) 0, transparent)`,
  },

  container: {
    display: "flex",
    flexDirection: "column",
  },

  pageTitle: {
    color: "#fff",
    border: "2px solid #fff",
    maxWidth: "14ch",
    width: "auto",
    height: "auto",
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(7),
    textTransform: "capitalize",
  },
}));

const Result = () => {
  const classes = useStyles();
  const [rotate, setRotate] = useState(true);

  const handleOnClick = () => {
    setRotate((prevState) => !prevState);
  };

  return (
    <>
      <div className={classes.space}>
        <div className={classes.container}>
          <Typography variant="h5" className={classes.pageTitle}>
            &nbsp;Election Result&nbsp;
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
        </div>
      </div>
    </>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

export default Result;
