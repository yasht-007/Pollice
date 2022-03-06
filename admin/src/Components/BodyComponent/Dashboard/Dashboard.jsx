import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../Common/CommonComponent";
import { CardContent } from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import axios from "axios";

export default function Dashboard() {
  const classes = useStyles();
  const [host, setHost] = useState(0);
  const [activehost, setActiveHost] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [users, setUsers] = useState(0);

 useEffect(() => {
    getCardDetails();
  }, []);

  const getCardDetails = async () => {
    try {
      const getStats = await axios.get(
        "https://pollice-elections.herokuapp.com/api/admin/getstats"
      );

      setHost(getStats.data.hosts);
      setActiveHost(getStats.data.activeHosts);
      setCompleted(getStats.data.completedCampaigns);
      setUsers(getStats.data.totalUsers);

    } catch (error) {
      window.alert(error.message);
    }
  };

  const DisplayData = [
    {
      label: "Total Hosts",
      value: host,
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Active Campaigns",
      value: activehost,
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "Completed Campaigns",
      value: completed,
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
    {
      label: "Total Users",
      value: users,
      icon: <ArrowDropDownIcon />,
      iconLabel: "30%",
    },
  ];

  return (
    <Box>
      <PageHeader label="Dashboard" pageTitle="Pollice Overview" />
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
  );
}
