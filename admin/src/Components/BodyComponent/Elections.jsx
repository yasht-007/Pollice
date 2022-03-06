import React, { useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../../utils/MaterialTableIcons";

export default function Elections() {
  const classes = useStyles();

  const [elections, setElections] = useState({
    data: [
      {
        _id: "",
        email: "",
        organizationName: "",
        typeOfOrg: "",
        eStartDate: "",
        eEndDate: "",
        electionStatus: "",
      },
    ],
  });

  React.useEffect(() => {
    getElections();
  }, [])
  

  const columns = [
    { title: "Id", field: "_id" },
    { title: "Email", field: "email" },
    { title: "Name", field: "organizationName" },
    {
      title: "Type",
      field: "typeOfOrg",
    },
    { title: "Start", field: "eStartDate" },
    { title: "End", field: "eEndDate" },
    { title: "Status", field: "electionStatus" },
  ];

  const getElections = async () => {
    try {
      const getElection = await axios.get("https://pollice-elections.herokuapp.com/api/admin/elections");

      if (getElection.data.status === "ok") {
        setElections({
          data: getElection.data.elections,
        });
      } else {
        setElections({
          data: [
            {
              _id: "",
              email: "",
              organizationName: "",
              typeOfOrg: "",
              eStartDate: "",
              eEndDate: "",
              electionStatus: "",
            },
          ],
        });
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
  return (
    <Box className={classes.section}>
      <Grid container spacing={1}>
        <>
          <Container>
            <MaterialTable
              title="Elections Data:"
              columns={columns}
              data={elections.data}
              style={{
                textAlign: "center",
                textOverflow: "ellipsis",
                marginTop: "20px",
              }}
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
      </Grid>
    </Box>
  );
}
