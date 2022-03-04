import React, { useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../../utils/MaterialTableIcons";

export default function Users() {
  const classes = useStyles();

  const [users, setUsers] = useState({
    data: [
      {
        _id: "",
        name: "",
        email: "",
        aadharNumber: "",
        walletAddress: "",
      },
    ],
  });

  React.useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { title: "Id", field: "_id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    {
      title: "Aadhaar",
      field: "aadharNumber",
    },
    { title: "wAddress", field: "walletAddress" },
  ];

  const getUsers = async () => {
    try {
      const Users = await axios.get("http://localhost:5000/api/admin/users");

      if (Users.data.status === "ok") {
        setUsers({
          data: Users.data.users,
        });
      } else {
        setUsers({
          data: [
            {
              _id: "",
              name: "",
              email: "",
              aadharNumber: "",
              walletAddress: "",
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
              data={users.data}
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
