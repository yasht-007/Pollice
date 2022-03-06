import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Container } from "@material-ui/core";
import { Box, Grid, CircularProgress } from "@material-ui/core";
import tableIcons from "../../utils/MaterialTableIcons";
import { PageHeader } from "../Common/CommonComponent";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

export default function ElectionComponent() {
  const [posts, setPosts] = useState({
    data: [
      {
        organizationName: "",
        email: "",
        contactNumber: 0,
        eStartDate: "",
        eEndDate: "",
        typeOfOrg: "",
        purpose: "",
      },
    ],
  });

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    getRequests();
  }, [refreshKey]);

  const columns = [
    { title: "Name", field: "organizationName" },
    { title: "Email", field: "email" },
    { title: "Contact", field: "contactNumber", type: "numeric" },
    {
      title: "Start",
      field: "eStartDate",
    },
    { title: "End", field: "eEndDate" },
    { title: "Type", field: "typeOfOrg", type: "string" },
    {
      title: "Purpose",
      field: "purpose",
      type: "string",
    },
  ];

  const getRequests = async () => {
    await axios
      .get("https://pollice-elections.herokuapp.com/api/admin/hosts")
      .then((res) => {
        if (res.data.status === "ok") {
          const hosts = res.data.hosts;
          setPosts({ data: hosts });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveHost = (email) => {
    axios
      .post("https://pollice-elections.herokuapp.com/api/admin/approve", {
        email: email,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setRefreshKey((oldKey) => oldKey + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectHost = (email) => {
    axios
      .post("https://pollice-elections.herokuapp.com/api/admin/reject", {
        email: email,
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setRefreshKey((oldKey) => oldKey + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <PageHeader label="requests" />

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
                actions={[
                  {
                    icon: DoneIcon,
                    iconProps: { style: { fontSize: "10px", color: "green" } },
                    tooltip: "Approve",
                    onClick: (event, rowData) => approveHost(rowData.email),
                  },
                  {
                    icon: CloseIcon,
                    iconProps: { style: { fontSize: "14px", color: "red" } },
                    tooltip: "Reject",
                    onClick: (event, rowData) => rejectHost(rowData.email),
                  },
                ]}
              />
            </Container>
          </>
        )}
      </Grid>
    </Box>
  );
}
