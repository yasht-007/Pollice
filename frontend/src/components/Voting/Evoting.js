import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Buttonthird1 } from "../ButtonElement";

const useStyles = makeStyles((theme) => ({
  space: {
    background:
      "linear-gradient(130deg, #ac1a2a, #1f1fb2 41.07%, #bb2dfd 76.05%)",
    minHeight: "50vh",
    margin: "0",

    "@media screen and (max-width: 768px)": {
      width: "auto",
      height: "auto",
    },
  },

  pageTitle: {
    color: "#fff",
    border: "2px solid #fff",
    maxWidth: "11ch",
    width: "auto",
    height: "auto",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textTransform: "capitalize",
  },
  container: {
    margin: "1.5vw",
    height: "auto",
    backgroundColor: "#aaa3",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "rgba(190, 190, 190, 0.3)",
    borderRadius: "10px",
    backdropFilter: "blur(20px)",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),

    "@media screen and (max-width: 768px)": {
      justifyContent: "center",
    },
  },
  card: {
    margin: "1.5vw",
    padding: "1vw",
    width: "28vw",
    backgroundColor: "#1113",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
    color: "#eeec",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "#3333",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    fontFamily: "sans-serif",
    flexShrink: "1",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: ".3s ease all",

    "&:hover": {
      transform: "scale(1.01)",
    },

    "@media screen and (max-width: 768px)": {
      width: "60vw",
    },
  },

  cardProposal: {
    margin: "1.5vw",
    padding: "1vw",
    minwidth: "auto",
    maxWidth: "110vw",
    alignSelf: "center",
    backgroundColor: "#1113",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
    color: "#eeec",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "#3333",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    fontFamily: "sans-serif",
    flexShrink: "1",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: ".3s ease all",

    "&:hover": {
      transform: "scale(1.01)",
    },

    "@media screen and (max-width: 768px)": {
      minWidth: "auto",
      maxWidth: "70vw",
    },
  },
}));

const Evoting = () => {
  const classes = useStyles();
  return (
    <div className={classes.space}>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "60px" }}
      >
        <Typography variant="h5" className={classes.pageTitle}>
          &nbsp;Voting Zone&nbsp;
        </Typography>

        <div className={classes.cardProposal}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Typography
              variant="h5"
              style={{
                color: "#fff",
                fontFamily: "Montserrat",
                fontWeight: "600",
              }}
            >
              Voting Proposal:
            </Typography>
            &nbsp; &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                color: "#fff",
                fontFamily: "Montserrat",
                fontWeight: "400",
              }}
            >
              Select Your next CFO for Company
            </Typography>
          </div>
        </div>

        <div className={classes.container} id="ctn_1">
          <div className={classes.card}>
            <h1 style={{ color: "#FEE3EC" }}>#Candidate Info</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <Typography variant="h5">Identification No:&nbsp; </Typography>
              <Typography variant="h5">1</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Name:&nbsp; </Typography>
              <Typography variant="h5">Yash Tiwari</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Address:&nbsp; </Typography>
              <Typography
                variant="h5"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Buttonthird1>Vote Candidate</Buttonthird1>
            </div>
          </div>

          <div className={classes.card}>
            <h1 style={{ color: "#FEE3EC" }}>Candidate Details</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <Typography variant="h5">Identification No:&nbsp; </Typography>
              <Typography variant="h5">1</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Name:&nbsp; </Typography>
              <Typography variant="h5">Yash Tiwari</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Address:&nbsp; </Typography>
              <Typography
                variant="h5"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Buttonthird1>Vote Candidate</Buttonthird1>
            </div>
          </div>

          <div className={classes.card}>
            <h1 style={{ color: "#FEE3EC" }}>Candidate Details</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <Typography variant="h5">Identification No:&nbsp; </Typography>
              <Typography variant="h5">1</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Name:&nbsp; </Typography>
              <Typography variant="h5">Yash Tiwari</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Address:&nbsp; </Typography>
              <Typography
                variant="h5"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Buttonthird1>Vote Candidate</Buttonthird1>
            </div>
          </div>

          <div className={classes.card}>
            <h1 style={{ color: "#FEE3EC" }}>Candidate Details</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <Typography variant="h5">Identification No:&nbsp; </Typography>
              <Typography variant="h5">1</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Name:&nbsp; </Typography>
              <Typography variant="h5">Yash Tiwari</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Address:&nbsp; </Typography>
              <Typography
                variant="h5"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Buttonthird1>Vote Candidate</Buttonthird1>
            </div>
          </div>

          <div className={classes.card}>
            <h1 style={{ color: "#FEE3EC" }}>Candidate Details</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <Typography variant="h5">Identification No:&nbsp; </Typography>
              <Typography variant="h5">1</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Name:&nbsp; </Typography>
              <Typography variant="h5">Yash Tiwari</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Typography variant="h5">Address:&nbsp; </Typography>
              <Typography
                variant="h5"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                0x6e93b6599A5eff8a4DD51343C569c1e6f6A61C42
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Buttonthird1>Vote Candidate</Buttonthird1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evoting;
