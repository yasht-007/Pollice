import React from "react";
import CampaignTable from "./CampaignTable";
import Banner from "./Banner";
import { makeStyles } from "@material-ui/core";

const Electionstats = () => {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#000",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();
  return (
    <>
      <div className={classes.App} id="elections">
        <Banner />
        <CampaignTable/>
      </div>
    </>
  );
};

export default Electionstats;
