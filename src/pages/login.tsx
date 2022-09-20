import React, { useState } from "react";
import LoginForm from "components/login/LoginForm";

import { Box, Grid } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid
        container
        sx={{ flex: "1 1 auto", height: "100vh", alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <QrCodeScannerIcon sx={{ color: "white", fontSize: "10rem" }} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box maxWidth="sm" p={5}>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
