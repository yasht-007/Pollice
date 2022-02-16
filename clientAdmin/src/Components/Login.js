import React, { useEffect } from "react";
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
import { ElectionHostState } from "./HostContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [email, setEmail] = React.useState("");
  const [key, setKey] = React.useState("");
  const { login, setLogin } = ElectionHostState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || key === "") {
      window.alert("Please fill all the fields");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      window.alert("Email is invalid");
    } else {
      await axios
        .post("http://localhost:5000/api/host/login", {
          email: email,
          key: key,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            localStorage.setItem("token", res.data.token);
            // window.alert("Login Successful");

            // axios.get("http://localhost:5000/api/isUserAuth", {
            //   headers: {
            //     "x-access-token": localStorage.getItem("token"),
            //   },
            // }).then((res) => {
            //   console.log(res.data);
            // });
            setLogin(res.data.token);
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
                <Typography variant="h6">Pollice Hosting Panel</Typography>
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
                          type="email"
                          placeholder="Email"
                          fullWidth
                          name="username"
                          variant="outlined"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoFocus
                        />
                      </Grid>
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
