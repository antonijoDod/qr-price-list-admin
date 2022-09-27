import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";

import { useGetBusinesses } from "hooks/businesses";
import BusinessListResults from "components/business/Business-list-results";
import BusinessNew from "components/business/Business-new";

const Business = () => {
  const { businessesData, isLoading, isError } = useGetBusinesses();

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState<boolean>(false);

  /* Handle if form is successful submitted */
  const handleSuccessAction = () => {
    setIsAlertSuccessOpen(true);
    setIsOpenDialog(false);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertSuccessOpen(false);
  };

  if (isError) {
    return <Box>Error is occurred</Box>;
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography variant="h4" mb={3}>
              Business info
            </Typography>
            <Button onClick={() => setIsOpenDialog(true)} variant="contained">
              New business
            </Button>
          </Box>
          <Box sx={{ mt: 3 }}>
            {isLoading ? (
              <>Loading</>
            ) : (
              <BusinessListResults businesses={businessesData} />
            )}
          </Box>
        </Container>
      </Box>
      <Dialog
        maxWidth="md"
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      >
        <DialogTitle>New business</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new business, please fill in all required fields.
          </DialogContentText>
          <BusinessNew successAction={() => handleSuccessAction()} />
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={isAlertSuccessOpen}
        key={"new-business"}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Business is added
        </Alert>
      </Snackbar>
    </>
  );
};

export default Business;
