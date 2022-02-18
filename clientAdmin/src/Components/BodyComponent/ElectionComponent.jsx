import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Avatar,
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@material-ui/core";
import Popup from "reactjs-popup";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
import { Typography } from "@material-ui/core";
import { ElectionHostState } from "../HostContext";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Person";
import AccounntBalanceIcon from "@material-ui/icons/AccountBalanceRounded";
import axios from "axios";

export default function ElectionComponent() {
  const classes = useStyles();
  const { host } = ElectionHostState();
  const [posts, setPosts] = useState({
    data: [
      {
        name: "",
        walletAddress: "",
      },
    ],
  });

  const DisplayData = [
    {
      label: "Election Status",
      value: "Not Active",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Total Voters",
      value: "100",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Total Votes",
      value: "90",
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "Voting Percentage",
      value: "90%",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
  ];

  const contentStyle = {
    maxWidth: "600px",
    width: "60%",
    height: "55%",
    background: "#fff9d6",
    borderStyle: "solid",
    overflow: "scroll",
  };

  const getRequests = async () => {
    await axios
      .post("http://localhost:5000/api/host/getcandidate", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        if (res.status === 200) {
          const cand = res.data.cand;
          setPosts({ data: cand.candidates });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box>
        <PageHeader label="elections" pageTitle="Election Management: " />
        <Grid container spacing={1}>
          {DisplayData.map((item, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Card>
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

        <Box className={classes.epaper}>
          {/* <CircularProgress /> */}
          <Container className={classes.container}>
            <Typography variant="h5" style={{ padding: "10px", color: "blue" }}>
              Election Control :-
            </Typography>

            <Grid className={classes.ecard}>
              <Typography
                variant="h6"
                style={{ padding: "10px", color: "black" }}
              >
                Ballot Name :-
              </Typography>

              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ padding: "5px" }}
                size="small"
              />
            </Grid>

            <Grid className={classes.ecard}>
              <Typography
                variant="h6"
                style={{ padding: "10px", color: "black" }}
              >
                Proposal :-
              </Typography>

              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ padding: "5px", minWidth: "40vw" }}
                size="small"
              />
            </Grid>

            <Grid className={classes.ecard}>
              <Typography
                variant="h6"
                style={{ padding: "10px", color: "black" }}
              >
                Candidate Names :-
              </Typography>

              <Popup
                trigger={
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      height: "4ch",
                      marginTop: "10px",
                      textTransform: "none",
                    }}
                  >
                    See List
                  </Button>
                }
                onOpen={() => getRequests()}
                modal
                contentStyle={contentStyle}
              >
                {(close) => (
                  <Container
                    className={classes.container}
                    style={{ alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      Candidate List :-
                    </Typography>

                    {posts.data.map((item, i) => {
                      return (
                        <>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                          >
                            <ListItemIcon>
                              <InboxIcon />
                              <ListItemText primary={item.name} />
                            </ListItemIcon>
                          </List>
                        </>
                      );
                    })}

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        close();
                      }}
                    >
                      Confirm
                    </Button>
                  </Container>
                )}
              </Popup>
            </Grid>

            <Grid className={classes.ecard}>
              <Typography
                variant="h6"
                style={{ padding: "10px", color: "black" }}
              >
                Candidate Addresses :-
              </Typography>
              <Popup
                trigger={
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      height: "4ch",
                      marginTop: "10px",
                      textTransform: "none",
                    }}
                  >
                    See List
                  </Button>
                }
                modal
                contentStyle={contentStyle}
                onOpen={() => getRequests()}
              >
                {(close) => (
                  <Container
                    className={classes.container}
                    style={{ alignItems: "center" }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      Candidate Addresses :-
                    </Typography>

                    {posts.data.map((item, i) => {
                      return (
                        <>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                          >
                            <ListItemIcon>
                              <AccounntBalanceIcon />
                              <ListItemText primary={item.walletAddress} />
                            </ListItemIcon>
                          </List>
                        </>
                      );
                    })}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        close();
                      }}
                    >
                      Confirm
                    </Button>
                  </Container>
                )}
              </Popup>
            </Grid>
          </Container>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
            >
              Deploy
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
            >
              End
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.ebutton}
            >
              Result
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
}
