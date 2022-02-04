import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  bannerContent: {
    display: "flex",
    paddingTop: 0,
    justifyContent: "center",
    marginLeft: "25px",
  },
  paper: {
    backgroundColor: "#2e2e2e",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: "4px",
  },
  text: {
    color: "white",
    width: "8ch",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const DataAddress = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.bannerContent}>
        <div className={classes.paper}>
          <Typography variant="subtitle1" className={classes.text}>
            {props.address}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default DataAddress;
