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
    gotElection,
    setAllowed,
  } = ElectionState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchElections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account.wallet) {
      fetchUser();
    } // eslint-disable-next-line
  }, [account]);

  useEffect(() => {
    if (user && account.wallet) {
      fetchVoterStatus();
    } // eslint-disable-next-line
  }, [user, account]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return elections.filter((election) =>
      election.organizationName.toLowerCase().includes(search)
    );
  };

  const handleTableClick = (estatus, eid) => {
    if (user.registerations.find((eid) => eid.approvalStatus === "Permitted")) {
      localStorage.setItem("accountDetails", JSON.stringify(account));
      setAllowed(true);
      history(`/election/${eid}`);
    } else if (estatus === "Deployed") {
      setAlert({
        open: true,
        message:
          "Election is not yet started! Voter Registeration phase is going on! Please wait...",
        type: "error",
        time: 5000,
      });
    } else if (estatus === "Not Registered") {
      setAlert({
        open: true,
        message: "You are not registered for this election! So you can't vote!",
        type: "error",
        time: 5000,
      });
    }
  };

  const registerVoter = async (row) => {
    if (!account.wallet || !user) {
      setAlert({
        open: true,
        message:
          "Please first connect wallet or Register your account by clicking Register to vote button shown above",
        type: "error",
        time: 8000,
      });
      window.scrollTo(0, 0);
    } else {
      if (
        window.confirm(
          "Are you sure you want to register for election of " +
            row.organizationName +
            "?"
        )
      ) {
        await axios
          .post("https://pollice-election.herokuapp.com/api/elections/registervoter", {
            name: user.name,
            email: user.email,
            aadhar: user.aadharNumber,
            electionId: row._id,
            walletAddress: account.address,
            approvalStatus: "Pending",
          })
          .then((res) => {
            if (res.data.status === "ok") {
              setAlert({
                open: true,
                message:
                  "You have successfully registered for this election! Please reconnect your wallet or reload page to see the status of your registration",
                type: "success",
                time: 8000,
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
    }
  };

  const fetchVoterStatus = async () => {
    if (!user.registerations || user.registerations.length === 0) {
      setRegistered(false);
    } else {
      setRegistered(true);
    }
  };

  const findRegisteration = (eId) => {
    if (account.wallet && user) {
      if (registered && user.registerations.length > 0) {
        if (user.registerations.find((e) => e.eId === eId)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const voterRegStatus = (elI) => {
    if (user) {
      for (let i = 0; i < user.registerations.length; i++) {
        if (user.registerations[i].eId === elI) {
          return user.registerations[i].approvalStatus;
        }
      }
    } else {
      return "Not Registered";
    }
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

                {gotElection ? (
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
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                account.wallet && user
                                  ? row.electionStatus !== "Not Active" &&
                                    voterRegStatus(row._id) === "Permitted"
                                    ? handleTableClick(row.status, row._id)
                                    : setAlert({
                                        open: true,
                                        message:
                                          "Election is not yet started! Voter Registeration phase is going on! Please wait...",
                                        type: "error",
                                        time: 6000,
                                      })
                                  : setAlert({
                                      open: true,
                                      message:
                                        "Please first connect wallet or Register your account by clicking Register to vote button shown above",
                                      type: "error",
                                      time: 6000,
                                    })
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
                                {account.wallet &&
                                findRegisteration(row._id) ? (
                                  <span
                                    style={{
                                      fontSize: 17,
                                    }}
                                  >
                                    {voterRegStatus(row._id)}
                                  </span>
                                ) : row.electionStatus === "Deployed" ? (
                                  <TableButton
                                    type="submit"
                                    onClick={() => registerVoter(row)}
                                  >
                                    Register
                                  </TableButton>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: 17,
                                    }}
                                  >
                                    Not Registered
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="h5"
                          style={{
                            fontFamily: "Montserrat",
                          }}
                        >
                          No ongoing campaigns right now. Please stay tuned...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
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
