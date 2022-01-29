import { Container, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import BackgroundImage from "../images/banner.jpg";
import { Buttonsecond } from "./ButtonElement";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${BackgroundImage})`,
  },
  bannerContent: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: 0,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  function handleOpen() {}

  return (
    <div className={classes.banner} id="applyforhost">
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
          <Typography
            variant="h4"
            style={{
              fontweight: "bold",
              marginBottom: 15,
              color: "#01bf71",
              fontFamily: "monospace",
            }}
          >
            Election for your Community?
          </Typography>

          <Typography
            variant="subtitle1"
            style={{
              fontweight: "bold",
              marginBottom: 15,
              color: "#ffffff",
              fontFamily: "monospace",
            }}
          >
            If you want to host an election for your community, you can apply to
            us by clicking apply now.
          </Typography>

          <Buttonsecond
            to=""
            smooth={true}
            duration={500}
            spy={true}
            onClick={handleOpen}
            exact="true"
            offset={-80}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            Apply Now
          </Buttonsecond>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
