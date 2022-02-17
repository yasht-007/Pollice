import React from "react";
import { Box } from "@material-ui/core";
import { PageHeader } from "../Common/CommonComponent";
import { Typography } from "@material-ui/core";
import { useStyles } from "./BodyStyles";

export default function Voters() {
  const classes = useStyles();

  // const [posts, setPosts] = useState({
  //   data: [
  //     {
  //       organizationName: "",
  //       email: "",
  //       contactNumber: 0,
  //       eStartDate: "",
  //       eEndDate: "",
  //       typeOfOrg: "",
  //       purpose: "",
  //     },
  //   ],
  // });

  // const [refreshKey, setRefreshKey] = useState(0);

  // useEffect(() => {
  //   getRequests();
  // }, [refreshKey]);

  // const columns = [
  //   { title: "Name", field: "organizationName" },
  //   { title: "Email", field: "email" },
  //   { title: "Contact", field: "contactNumber", type: "numeric" },
  //   {
  //     title: "Start",
  //     field: "eStartDate",
  //   },
  //   { title: "End", field: "eEndDate" },
  //   { title: "Type", field: "typeOfOrg", type: "string" },
  //   {
  //     title: "Purpose",
  //     field: "purpose",
  //     type: "string",
  //   },
  // ];

  // const getRequests = async () => {
  //   await axios
  //     .get("http://localhost:5000/api/admin/hosts")
  //     .then((res) => {
  //       if (res.status === 200) {
  //         const hosts = res.data.hosts;
  //         setPosts({ data: hosts });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Box className={classes.section}>
      <PageHeader label="voter" />
      {/* <Grid container spacing={1}>
        {posts.length === 0 ? (
          <Box p={3} style={{ width: "100%", textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Container>
              <MaterialTable
                title="Voter Management:"
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
                    // onClick: (event, rowData) => approveHost(rowData.email),
                  },
                  {
                    icon: CloseIcon,
                    iconProps: { style: { fontSize: "14px", color: "red" } },
                    tooltip: "Reject",
                    // onClick: (event, rowData) => rejectHost(rowData.email),
                  },
                ]}
              />
            </Container>
          </>
        )}
      </Grid> */}
    </Box>
  );
}
