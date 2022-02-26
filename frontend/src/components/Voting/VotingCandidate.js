import React from "react";
import {
  CardContent,
  Grid,
  Typography,
  Card,
  Box,
  Container,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import {
  ButtonOutlined,
  Buttonsecond,
  Buttonthird,
  Buttonthird1,
} from "../ButtonElement";

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
    maxWidth: "11ch",
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
    textTransform: "initial",
    width: "auto",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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

const DisplayData = [
  {
    label: "Yash Tiwari",
    value: "0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42",
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
    value: "0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42",
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
    value: "0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42",
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
    value: "0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42",
    icon: <ArrowDropDownIcon />,
    iconLabel: "23%",
    color: "#FBDA61",
    secondarycolor: "#FF5ACD",
    degree: "45deg",
    first: "0%",
    second: "100%",
  },
  {
    label: "Time Deadline",
    value: "0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42",
    icon: <ArrowDropDownIcon />,
    iconLabel: "23%",
    color: "#FBDA61",
    secondarycolor: "#FF5ACD",
    degree: "45deg",
    first: "0%",
    second: "100%",
  },
  {
    label: "Time Deadline",
    value: "0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42",
    icon: <ArrowDropDownIcon />,
    iconLabel: "23%",
    color: "#FBDA61",
    secondarycolor: "#FF5ACD",
    degree: "45deg",
    first: "0%",
    second: "100%",
  },
];

const VotingCandidate = () => {
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
          &nbsp;Voting Zone&nbsp;
        </Typography>

        <Grid container spacing={1}>
          {DisplayData.map((item, i) => (
            <Grid item xs={5} sm={3} key={i}>
              <Card
                style={{
                  backgroundColor: "yellow",
                  borderRadius: "12px",
                }}
              >
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" style={{ textAlign: "center",color:"#000" }}>
                    &nbsp;Candidate Details&nbsp;
                  </Typography>
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
                  <Container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Buttonthird1>Vote</Buttonthird1>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default VotingCandidate;
