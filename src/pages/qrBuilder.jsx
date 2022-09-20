import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Builder from "../components/qr-builder/Builder";

const QrBuilder = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Typography variant="h4">Products</Typography>
        <Builder />
      </Container>
    </Box>
  );
};

export default QrBuilder;
