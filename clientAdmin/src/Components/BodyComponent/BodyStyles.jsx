import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  responsiveImg: {
    width: " 100%",
    height: "auto",
  },
  cardImage: {
    maxHeight: "150px",
    overflowY: "hidden",
  },
  //page
  pageTitle: {
    color: blueGrey[800],
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  pageSubTitle: {
    color: blueGrey[500],
    margin: theme.spacing(1, 0),
    textTransform: "uppercase",
  },

  //dashboard
  cardLabel: {
    textTransform: "uppercase",
    color: blueGrey[500],
    textAlign: "center",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  cardTitle: {
    textTransform: "capitalize",
    color: blueGrey[800],
    textAlign: "center",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
    },
  },
  ratioBtn: { fontSize: "1rem", fontWeight: "bold" },
  cardContent: {
    position: "relative",
  },
  //cardGraph
  displayCardGraph: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100% !important",
    height: "45% !important",
  },

  paper: {
    marginTop: "20px",
    background: "#fff",
    color: "black",
    maxHeight: "60vh",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  ecard: {
    background: "none",
    display: "flex",
    color: "black",
    flexDirection: "row",
  },

  epaper: {
    marginTop: "20px",
    background: "#fff",
    color: "black",
    height: "60vh",
  },

  ebutton: {
    marginRight: "10px",
  },

  ecpaper: {
    marginTop: "20px",
    background: "#fff",
    color: "black",
    height: "40vh",
  },
  
}));
