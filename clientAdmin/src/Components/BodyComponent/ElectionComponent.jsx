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
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
import { Typography } from "@material-ui/core";

export default function ElectionComponent() {
  const classes = useStyles();
  const [fetched, setfetched] = useState(false);
  const [posts, setPosts] = useState([]);

  return (
    <Box>
      <PageHeader label="elections" pageTitle="Election Management: " />

      <Grid container spacing={1}>
        {posts.length === 0 ? (
          <Box p={3} style={{ width: "100%", textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : null}
      </Grid>
    </Box>
  );
}
