import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Budget from "../components/dashboard/Budget";

const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <Budget />
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <Budget />
          </Grid>
          <Grid item xl={4} lg={4} sm={6} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            SCAN
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
