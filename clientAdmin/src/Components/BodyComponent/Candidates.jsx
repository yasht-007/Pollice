import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import {
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";

import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../../utils/MaterialTableIcons";
import { ElectionHostState } from "../HostContext";

export default function Candidates() {
  const classes = useStyles();
  const textInput = React.useRef(null);
  const textInput1 = React.useRef(null);
  const textInput2 = React.useRef(null);
  const [buttonclick, setButtonClick] = useState(false);

  const [posts, setPosts] = useState({
    data: [
      {
        name: "",
        walletAddress: "",
      },
    ],
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const [cName, setCname] = useState("");
  const [cAddress, setCaddress] = useState("");
  const { account, electionStatus, getElectionStatus } = ElectionHostState();

  useEffect(() => {
    if (account.wallet) {
      getRequests();
    }
  }, [refreshKey, account]);

  useEffect(() => {
    if (account.wallet) {
      getElectionStatus();

      if (electionStatus === "Not Active") {
        setButtonClick(false);
      } else {
        setButtonClick(true);
      }
    } else {
      setButtonClick(true);
    } // eslint-disable-next-line
  }, [account, electionStatus]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Wallet Address", field: "walletAddress" },
  ];

  const getRequests = async () => {
    await axios
      .post("https://pollice-election.herokuapp.com/api/host/getcandidate", {
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

  const addCandidate = (e) => {
    e.preventDefault();
    axios
      .post("https://pollice-election.herokuapp.com/api/host/addcandidate", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
        cName: cName,
        walletAddress: cAddress,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Added!");
          setRefreshKey(refreshKey + 1);
          textInput.current.value = "";
          textInput2.current.value = "";
          textInput1.current.value = "";
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const deleteCandidate = (e) => {
    //e.preventDefault();

    axios
      .post("https://pollice-election.herokuapp.com/api/host/deletecandidate", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        email: localStorage.getItem("email"),
        walletAddress: cAddress,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          window.alert("Deleted!");
          setRefreshKey(refreshKey + 1);
          textInput.current.value = "";
        } else {
          window.alert("Error!");
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  return (
    <>
      <Box className={classes.ecpaper}>
        {/* <CircularProgress /> */}
        <Container className={classes.container}>
          <Typography variant="h5" style={{ padding: "10px", color: "blue" }}>
            Add Candidate :-
          </Typography>

          <Grid className={classes.ecard}>
            <Typography
              variant="h6"
              style={{ padding: "10px", color: "black" }}
            >
              Candidate Name :-
            </Typography>

            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ padding: "5px" }}
              size="small"
              inputRef={textInput2}
              disabled={buttonclick === false ? "" : "disabled"}
              onChange={(e) => setCname(e.target.value)}
            />
          </Grid>

          <Grid className={classes.ecard}>
            <Typography
              variant="h6"
              style={{ padding: "10px", color: "black" }}
            >
              Candidate Wallet Address :-
            </Typography>

            <TextField
              id="outlined-basic"
              variant="outlined"
              style={{ padding: "5px", width: "42ch", maxWidth: "42ch" }}
              size="small"
              inputRef={textInput1}
              disabled={buttonclick === false ? "" : "disabled"}
              onChange={(e) => setCaddress(e.target.value)}
            />
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
            disabled={buttonclick}
            onClick={(e) => addCandidate(e)}
          >
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
            <Typography
              variant="h6"
              style={{ padding: "10px", color: "black" }}
            >
              Candidate Wallet Address :-
            </Typography>

            <TextField
              id="outlined-basic"
              variant="outlined"
              inputRef={textInput}
              style={{ padding: "5px", width: "42ch", maxWidth: "42ch" }}
              size="small"
              disabled={buttonclick === false ? "" : "disabled"}
              onChange={(e) => setCaddress(e.target.value)}
            />
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
            disabled={buttonclick}
            onClick={(e) => deleteCandidate(e)}
          >
            Delete Candidate
          </Button>
        </Container>
      </Box>
      <Box style={{ marginTop: "30px", marginLeft: "-20px" }}>
        <Grid container spacing={1}>
          {posts.length === 0 ? (
            <Box p={3} style={{ width: "100%", textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Container>
                <MaterialTable
                  title="Election Host Management:"
                  columns={columns}
                  data={posts.data}
                  options={{
                    actionsCellStyle: {
                      backgroundColor: "#fff",
                      color: "red",
                    },
                    toolbar: true,
                    search: true,
                    headerStyle: {
                      backgroundColor: "black",
                      color: "white",
                      pointerEvents: "none",
                    },
                  }}
                  icons={tableIcons}
                />
              </Container>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
