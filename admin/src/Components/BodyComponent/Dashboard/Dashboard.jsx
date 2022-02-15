import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../Common/CommonComponent";
import { CardContent } from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  fakeArrayDataGenerator,
  randomValueGenerator,
} from "../../../utils/fakeArrayDataGenetator";

export default function Dashboard() {
  const classes = useStyles();

  const DisplayData = [
    {
      label: "Total Hosts",
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Active Campaigns",
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "Completed Campaigns",
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
    {
      label: "Total Voters",
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: "30%",
    },
  ];

  return (
    <Box>
      {/* section title
      section card
      section graph
      section posts */}

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
