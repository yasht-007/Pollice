import React from "react";
import { CardContent, Grid, Typography, Card, Box } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import { ElectionState } from "../../ElectionContext";

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  responsiveImg: {
    width: " 100%",
    height: "auto",
  },
  cardImage: {
    maxHeight: "150px",
    overflowY: "hidden",
  },
  //page
  pageTitle: {
    color: "#fff",
    border: "2px solid #fff",
    maxWidth: "13ch",
    width: "auto",
    height: "auto",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textTransform: "capitalize",
  },
  pageSubTitle: {
    color: blueGrey[500],
    margin: theme.spacing(1, 0),
    textTransform: "uppercase",
  },

  //dashboard
  cardLabel: {
    textTransform: "uppercase",
    color: "#000",
    fontWeight: "600",
    fontFamily: "Montserrat sans-serif",
    textAlign: "center",
    margin: theme.spacing(1, 0),
    fontSize: "21px",
  },
  cardTitle: {
    textTransform: "capitalize",
    color: blueGrey[900],
    textAlign: "center",
    margin: theme.spacing(1, 0),
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  ratioBtn: { fontSize: "1rem", fontWeight: "bold" },
  cardContent: {
    position: "relative",
  },
}));

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

const TopCards = () => {
  const classes = useStyles();
  const { account, host, totalvoter, totalvotes, voterStatus } =
    ElectionState();

  var startDate = host.data.eStartDate;
  startDate = new Date(startDate).toDateString();

  if (startDate.charAt(8) === "0") {
    startDate =
      startDate.charAt(10) +
      ordinal_suffix_of(startDate.charAt(9)) +
      " " +
      startDate.substring(4, 7);
  } else {
    startDate =
      startDate.substring(8, 9) +
      ordinal_suffix_of(startDate.charAt(9)) +
      " " +
      startDate.substring(4, 7);
  }

  var endDate = host.data.eEndDate;
  endDate = new Date(endDate).toDateString();

  if (endDate.charAt(8) === "0") {
    endDate =
      endDate.charAt(10) +
      ordinal_suffix_of(endDate.charAt(9)) +
      " " +
      endDate.substring(4, 7);
  } else {
    endDate =
      endDate.substring(8, 9) +
      ordinal_suffix_of(endDate.charAt(9)) +
      " " +
      endDate.substring(4, 7);
  }

  if (host.data.eDeployDate !== "2022-02-30") {
    var deployDate = host.data.eDeployDate;
    deployDate = new Date(deployDate).toDateString();

    if (deployDate.charAt(8) === "0") {
      deployDate =
        deployDate.charAt(10) +
        ordinal_suffix_of(deployDate.charAt(9)) +
        " " +
        deployDate.substring(4, 7);
    } else {
      deployDate =
        deployDate.substring(8, 9) +
        ordinal_suffix_of(deployDate.charAt(9)) +
        " " +
        deployDate.substring(4, 7);
    }
  }

  const DisplayData = [
    {
      label: "Election Status",
      value:
        account.wallet && host.data.email !== ""
          ? host.data.electionStatus
          : "Not Connected",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
      color: "#0093E9",
      secondarycolor: "#80D0C7",
      degree: "160deg",
      first: "0%",
      second: "100%",
    },
    {
      label: "Voting Start",
      value: account.wallet && host.data.email !== "" ? startDate : "NA",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
      color: "#8EC5FC",
      secondarycolor: "#E0C3FC",
      degree: "62deg",
      first: "0%",
      second: "100%",
    },
    {
      label: "Voting End",
      value: account.wallet && host.data.email !== "" ? endDate : "NA",
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
      color: "#85FFBD",
      secondarycolor: "#FFFB7D",
      degree: "45deg",
      first: "0%",
      second: "100%",
    },
    {
      label: "Time Deadline",
      value: "10:00 am",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
      color: "#FBDA61",
      secondarycolor: "#FF5ACD",
      degree: "45deg",
      first: "0%",
      second: "100%",
    },

    {
      label: "Voting Percentage",
      value:
        account.wallet && host.data.electionStatus !== "Deployed"
          ? (totalvotes / totalvoter) * 100 + "%"
          : "NA",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
      color: "rgba(218,185,252,1)",
      secondarycolor: "rgba(125,89,252,1)",
      degree: "109.6deg",
      first: "11.2%",
      second: "91.1%",
    },
    {
      label: "Total Voters",
      value:
        account.wallet && host.data.electionStatus !== "Deployed"
          ? totalvoter
          : "NA",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
      color: "rgba(129,252,255,1)",
      secondarycolor: "rgba(255,175,207,1)",
      degree: "76.5deg",
      first: "22.8%",
      second: "64.6%",
    },
    {
      label: "Total Votes",
      value:
        account.wallet && host.data.electionStatus !== "Deployed"
          ? totalvotes
          : "NA",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
      color: "#0093E9",
      secondarycolor: "lightgreen",
      degree: "64.3deg",
      first: "17.7%",
      second: "112.1%",
    },
    {
      label: "Your Status",
      value:
        account.wallet && host.data.electionStatus !== "Deployed"
          ? voterStatus
          : "NA",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
      color: "#E0C3FC",
      secondarycolor: "#85fe86",
      degree: "12deg",
      first: "10%",
      second: "100%",
    },
  ];

  return (
    <>
      <Box
        sx={{
          marginTop: "80px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          width: "auto",
          overflow: "hidden",
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h5" className={classes.pageTitle}>
          &nbsp;Election Stats&nbsp;
        </Typography>
        <Grid container spacing={1}>
          {DisplayData.map((item, i) => (
            <Grid item xs={5} sm={3} key={i}>
              <Card
                className={classes.root}
                style={{
                  backgroundColor: item.color,
                  backgroundImage: `linear-gradient(${item.degree}, ${item.color} ${item.first}, ${item.secondarycolor} ${item.second})`,
                  backdropFilter: "blur(16px) saturate(180%)",
                  webkitBackdropFilter: " blur(16px) saturate(180%)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                }}
              >
                <CardContent className={classes.cardContent}>
                  <Typography variant="body2" className={classes.cardLabel}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h6"
                    className={classes.cardTitle}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    component="p"
                    style={{
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  ></Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default TopCards;
