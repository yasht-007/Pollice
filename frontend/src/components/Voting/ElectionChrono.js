import React from "react";
import { Chrono } from "react-chrono";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { ButtonOutlined1 } from "../ButtonElement";
import { ElectionState } from "../../ElectionContext";

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
  const { account, host } = ElectionState();

  var startDate = new Date(host.data.eStartDate).toDateString();
  startDate =
    startDate.substring(8, 10) +
    " " +
    startDate.substring(4, 7) +
    " " +
    startDate.substring(11, 15);

  var endDate = new Date(host.data.eEndDate).toDateString();
  endDate =
    endDate.substring(8, 10) +
    " " +
    endDate.substring(4, 7) +
    " " +
    endDate.substring(11, 15);

  var deployDate = new Date(host.data.eDeployDate).toDateString();
  deployDate =
    deployDate.substring(8, 10) +
    " " +
    deployDate.substring(4, 7) +
    " " +
    deployDate.substring(11, 15);

  var resultDate = new Date(host.data.eResultDate).toDateString();
  resultDate =
    resultDate.substring(8, 10) +
    " " +
    resultDate.substring(4, 7) +
    " " +
    resultDate.substring(11, 15);

  const items = [
    {
      title: account ? deployDate : "NA",
      cardTitle: "Contract Deployed",
      cardSubtitle:
        "Contract is deployed on the Ethereum Ropsten Testnet Blockchain.",
    },
    {
      title: account ? startDate : "NA",
      cardTitle: "Voting is Live",
      cardSubtitle: "Voting is now open for all voters.",
    },
    {
      title: account ? endDate : "NA",
      cardTitle: "Voting Ends",
      cardSubtitle: "Voting is now disabled, now please wait for result.",
    },
    {
      title: account ? resultDate : "NA",
      cardTitle: "Election Result",
      cardSubtitle:
        "Winner is Announced. Thanks for Participating and Congratulations to Winner",
    },
  ];

  const getActiveIndex = () => {
    if (host.data.electionStatus === "Deployed") {
      return 0;
    } else if (host.data.electionStatus === "Started") {
      return 1;
    } else if (host.data.electionStatus === "Ended") {
      return 2;
    } else if (host.data.electionStatus === "Result") {
      return 3;
    } else {
      return -1;
    }
  };

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
            allowDynamicUpdate={true}
            activeItemIndex={getActiveIndex()}
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
