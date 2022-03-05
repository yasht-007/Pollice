import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { AdminState } from "../AdminContext";

const useStyles = makeStyles(() => ({
  loginForm: {
    justifyContent: "center",
    minHeight: "90vh",
  },

  buttonBlock: {
    width: "100%",
  },

  loginBackground: {
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [key, setKey] = React.useState("");
  const { setLogin } = AdminState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (key === "") {
      window.alert("Please fill all the fields");
    } //eslint-disable-next-line
    else {
      await axios
        .post("https://pollice-election.herokuapp.com/api/checkadmin", {
          key: key,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            localStorage.setItem("loggedIn", "yes");
            setLogin("yes");
          } else {
            window.alert("Invalid login");
          }
        });
    }
  };

  return (
    <div>
      <div>
        <AppBar position="static" alignitems="center" color="primary">
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">Pollice Admin Panel</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className={classes.loginForm}
            >
              <Paper
                variant="elevation"
                elevation={2}
                className={classes.loginBackground}
              >
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Sign in to Hosting Panel
                  </Typography>
                </Grid>
                <Grid item>
                  <br />
                  <form action="#">
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Private Key"
                          fullWidth
                          name="key"
                          variant="outlined"
                          onChange={(e) => setKey(e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.buttonBlock}
                          onClick={(e) => handleSubmit(e)}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
