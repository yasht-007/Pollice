import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../Common/CommonComponent";
import { CardContent } from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  fakeArrayDataGenerator,
  randomValueGenerator,
} from "../../../utils/fakeArrayDataGenetator";
import { ElectionHostState } from "../../HostContext";
import axios from "axios";

export default function Dashboard() {
  const classes = useStyles();
  const { host, setHost, account } = ElectionHostState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/host/getdata", {
        headers: {
          "x-access-token": token,
        },
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        const ho = res.data.host;
        setHost({ data: ho });
      });
  };

  const DisplayData = [
    {
      label: "Election Status",
      value: account.wallet ? host.data.electionStatus : "Not Connected",
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Voting Start Date",
      value: host.data.eStartDate,
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Voting End Date",
      value: host.data.eEndDate,
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "Time Deadline",
      value: "10:00 am",
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
  ];

  return (
    <>
      <Box>
        <PageHeader label="Dashboard" pageTitle="Election Overview" />
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
      </Box>

      <Box className={classes.paper}>
        <Container className={classes.container}>
          <Typography variant="h6" style={{ padding: "10px", color: "blue" }}>
            My account Details :-
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Name: &nbsp;{host.data.organizationName}
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Email: &nbsp;{host.data.email}
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Contact: &nbsp;{host.data.contactNumber}
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Registration No: &nbsp;{host.data.regNo}
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Organization Type: &nbsp;{host.data.typeOfOrg}
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Purpose: &nbsp;{host.data.purpose}
          </Typography>
          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Address: &nbsp;{host.data.address}
          </Typography>

          <Typography variant="subtitle" style={{ padding: "10px" }}>
            Result Date: &nbsp;{host.data.eResultDate}
          </Typography>
        </Container>
      </Box>
    </>
  );
}
