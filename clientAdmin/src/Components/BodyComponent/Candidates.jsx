import React from "react";
import { Box } from "@material-ui/core";
import { PageHeader } from "../Common/CommonComponent";
import {
  Typography,
  Container,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";

export default function Candidates() {
  const classes = useStyles();
  return <>
    <Box className={classes.ecpaper}>
      {/* <CircularProgress /> */}
      <Container className={classes.container}>
        <Typography variant="h5" style={{ padding: "10px", color: "blue" }}>
          Add Candidate :-
        </Typography>

        <Grid className={classes.ecard}>
          <Typography variant="h6" style={{ padding: "10px", color: "black" }}>
            Candidate Name :-
          </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ padding: "5px" }}
            size="small"
          />
        </Grid>

        <Grid className={classes.ecard}>
          <Typography variant="h6" style={{ padding: "10px", color: "black" }}>
            Candidate Wallet Address :-
          </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ padding: "5px", width: "42ch", maxWidth: "42ch" }}
            size="small"
          />
        </Grid>
      </Container>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" color="primary">
          Add Candidate
        </Button>
      </Container>
    </Box>
  <Box className={classes.ecpaper}>
      {/* <CircularProgress /> */}
      <Container className={classes.container}>
        <Typography variant="h5" style={{ padding: "10px", color: "blue" }}>
          Delete Candidate :-
        </Typography>

        <Grid className={classes.ecard}>
          <Typography variant="h6" style={{ padding: "10px", color: "black" }}>
            Candidate Name :-
          </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ padding: "5px" }}
            size="small"
          />
        </Grid>

        <Grid className={classes.ecard}>
          <Typography variant="h6" style={{ padding: "10px", color: "black" }}>
            Candidate Wallet Address :-
          </Typography>

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ padding: "5px", width: "42ch", maxWidth: "42ch" }}
            size="small"
          />
        </Grid>
      </Container>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" color="primary">
          Delete Candidate
        </Button>
      </Container>
    </Box>
    </>
}
