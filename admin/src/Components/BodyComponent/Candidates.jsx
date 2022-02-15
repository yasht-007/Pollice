import React from "react";
import { Box } from "@material-ui/core";
import { PageHeader } from "../Common/CommonComponent";
import { Typography } from "@material-ui/core";
import { useStyles } from "./BodyStyles";

export default function Candidates() {
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      <PageHeader label='candidate' pageTitle='Candidate Registeration: ' />
    </Box>
  );
}
