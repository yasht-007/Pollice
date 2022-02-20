import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableCell,
  Container,
  LinearProgress,
  Typography,
  Table,
  ThemeProvider,
  TextField,
  TableRow,
  TableHead,
  TableBody,
  Paper,
  createTheme,
  TableContainer,
} from "@material-ui/core";
import { ElectionState } from "../../ElectionContext";
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from "react-router-dom";
import { TableButton } from "../ElectionRegister/RegisterElements";
import axios from "axios";

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const CampaignTable = () => {
  const classes = useStyles();
  const history = useNavigate();
  const {
    account,
    fetchElections,
    elections,
    loading,
    setAlert,
    user,
    fetchUser,
    registered,
    setRegistered,
  } = ElectionState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isElection, setIsElection] = useState(0);

  useEffect(() => {
    if (isElection >= 2) {
      setAlert({
        open: true,
        message:
          "Election is not yet started! Voter Registeration phase is going on! Please wait...",
        type: "error",
        time: 5000,
      });
    }
  }, [isElection]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchElections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account.wallet) {
      fetchUser();
    }
  }, [account]);

  useEffect(() => {
    if (user) {
      fetchVoterStatus();
    }
  }, [user]);

  const handleSearch = () => {
    return elections.filter((election) =>
      election.organizationName.toLowerCase().includes(search)
    );
  };

  const handleTableClick = (estatus, eid) => {
    if (estatus === "Deployed") {
      setIsElection((isElection) => isElection + 1);
    } else {
      history(`/election/${eid}`);
    }
  };

  const registerVoter = async (row) => {
    setIsElection(0);

    if (!account.wallet) {
      setAlert({
        open: true,
        message:
          "Please first connect wallet or Register your account by clicking Register to vote button shown above",
        type: "error",
        time: 8000,
      });
      window.scrollTo(0, 0);
    } else {
      await axios
        .post("http://localhost:5000/api/elections/registervoter", {
          name: user.name,
          email: user.email,
          aadhar: user.aadharNumber,
          electionId: row._id,
          walletAddress: account.address,
        })
        .then((res) => {
          if (res.data.status === "ok") {
            setAlert({
              open: true,
              message:
                "You have successfully registered for this election! You will get an email confirmation shortly",
              type: "success",
              time: 6000,
            });
            setRegistered(true);
          } else {
            setAlert({
              open: true,
              message: "Unknown Error Occured",
              type: "error",
              time: 3000,
            });
          }
        })
        .catch((err) => {
          setAlert({
            open: true,
            message: err.message,
            type: "error",
            time: 7000,
          });
        });
    }
  };

  const fetchVoterStatus = async () => {
    await axios
      .post("http://localhost:5000/api/elections/voterregisterstatus", {
        electionId: elections._id,
        walletAddress: account.address,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setRegistered(true);
        }
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
          time: 5000,
        });
        setRegistered(false);
      });
  };

  return (
    <div id="campaigns">
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 20, fontFamily: "Montserrat" }}
          >
            Ongoing Pollice Campaigns
          </Typography>
          <TextField
            label="Search Your Organization.."
            variant="outlined"
            style={{ marginBottom: 30, width: "100%" }}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />

          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "#01bf71" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#01bf71" }}>
                  <TableRow>
                    {[
                      "Name",
                      "Type of Organiation",
                      "Election Period",
                      "Status",
                      "Your Status",
                    ].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Name" ? "" : "center"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const eDate = row.eStartDate + " - " + row.eEndDate;

                      return (
                        <>
                          <TableRow
                            className={classes.row}
                            key={row.organizationName}
                            onClick={() =>
                              handleTableClick(row.electionStatus, row._id)
                            }
                          >
                            <TableCell component="th" scope="row">
                              <span
                                style={{
                                  fontSize: 17,
                                }}
                              >
                                {row.organizationName}
                              </span>
                            </TableCell>
                            <TableCell align="center">
                              <span
                                style={{
                                  fontSize: 17,
                                  textTransform: "capitalize",
                                }}
                              >
                                {row.typeOfOrg}
                              </span>
                            </TableCell>

                            <TableCell align="center">
                              <span
                                style={{
                                  fontSize: 17,
                                }}
                              >
                                {eDate}
                              </span>
                            </TableCell>
                            <TableCell align="center">
                              <span
                                style={{
                                  fontSize: 17,
                                }}
                              >
                                {row.electionStatus}
                              </span>
                            </TableCell>

                            <TableCell align="center">
                              {row.electionStatus === "Deployed" ? (
                                registered && account.wallet ? (
                                  <span
                                    style={{
                                      fontSize: 17,
                                    }}
                                  >
                                    Registered
                                  </span>
                                ) : (
                                  <TableButton
                                    type="submit"
                                    onClick={() => registerVoter(row)}
                                  >
                                    Register
                                  </TableButton>
                                )
                              ) : (
                                <TableButton type="submit">Vote</TableButton>
                              )}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          {/* Comes from @material-ui/lab */}
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 1100);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CampaignTable;
