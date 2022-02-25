import React from "react";
import { Chrono } from "react-chrono";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { ButtonOutlined1 } from "../ButtonElement";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    color: "#fff",
    border: "2px solid #fff",
    maxWidth: "15ch",
    width: "auto",
    height: "auto",
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textTransform: "capitalize",
  },
}));

const ElectionChrono = () => {
  const classes = useStyles();
  const items = [
    {
      title: "23 Feb 2022",
      cardTitle: "Contract Deployed",
      cardSubtitle:
        "Contract is deployed on the Ethereum Ropsten Testnet Blockchain.",
    },
    {
      title: "25 Feb 2022",
      cardTitle: "Voting Opening",
      cardSubtitle: "Voting is now open for all voters.",
    },
    {
      title: "28 Feb 2022",
      cardTitle: "Voting Ending",
      cardSubtitle: "a destroyer during the evacuation from Dunkirk.",
    },
    {
      title: "30 Feb 2022",
      cardTitle: "Election Result",
      cardSubtitle: "a destroyer during the evacuation from Dunkirk.",
    },
  ];

  return (
    <>
    <div id="timeline">
      <Typography variant="h5" className={classes.pageTitle}>
        &nbsp;Election Timeline&nbsp;
      </Typography>
      <div style={{ width: "100%", height: "auto", color: "#fff" }}>
        <Chrono
          items={items}
          mode="VERTICAL"
          theme={{
            primary: "grey",
            secondary: "white",
            cardBgColor: "transparent",
            cardForeColor: "violet",
            titleColor: "#000",
          }}
          activeItemIndex={0}
          lineWidth={2}
          hideControls
          disableAutoScrollOnClick
          timelineCircleDimension={25}
          disableClickOnCircle={true}
        ></Chrono>
      </div>
      </div>
    </>
  );
};

export default ElectionChrono;
