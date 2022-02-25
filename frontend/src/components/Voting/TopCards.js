import React from "react";
import { CardContent, Grid, Typography, Card, Box } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

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
    maxWidth:"13ch",
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
    textAlign: "center",
    margin: theme.spacing(1, 0),
    fontSize: "21px",
  },
  cardTitle: {
    textTransform: "capitalize",
    color: blueGrey[900],
    textAlign: "center",
    textTransform: "initial",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  ratioBtn: { fontSize: "1rem", fontWeight: "bold" },
  cardContent: {
    position: "relative",
  },
  //cardGraph
  displayCardGraph: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100% !important",
    height: "45% !important",
  },

  paper: {
    marginTop: "20px",
    background: "#fff",
    color: "black",
    maxHeight: "60vh",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  ecard: {
    background: "none",
    display: "flex",
    color: "black",
    flexDirection: "row",
  },

  epaper: {
    marginTop: "20px",
    background: "#fff",
    color: "black",
    height: "60vh",
  },

  ebutton: {
    marginRight: "10px",
  },

  ecpaper: {
    marginTop: "20px",
    background: "#fff",
    color: "black",
    height: "40vh",
  },
}));

const DisplayData = [
  {
    label: "Election Status",
    value: "Contract Deployed",
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
    value: "25th Feb",
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
    value: "28th Feb",
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
    value: "10:00 am",
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
    value: "10:00 am",
    icon: <ArrowDropDownIcon />,
    iconLabel: "23%",
    color: "rgba(129,252,255,1)",
    secondarycolor: "rgba(255,175,207,1)",
    degree: "76.5deg",
    first: "22.8%",
    second: "64.6%",
  },
];

const TopCards = () => {
  const classes = useStyles();
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
            <Grid item xs={5} sm={4} key={i}>
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
