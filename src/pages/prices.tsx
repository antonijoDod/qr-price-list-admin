import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import List from "../components/price-list/List";

import { useGetBusinesses, useGetBusiness } from "hooks/businesses";
import AddCategoryForm from "components/price-list/AddCategoryForm";

const Prices = () => {
  const [businessID, setBusinessID] = useState<number>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const { businessesData, isLoading, isError } = useGetBusinesses();
  const { businessData, isLoading: isLoadingBusiness } = useGetBusiness(
    businessID as number
  );

  /* Handle if form is successful submitted */
  const handleSuccessAction = () => {
    setIsOpenDialog(false);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Price list</Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setIsOpenDialog(true)}
          >
            Add category
          </Button>
        </Box>
        <Box sx={{ my: 3 }} maxWidth="sm">
          <FormControl fullWidth>
            <InputLabel>Business name</InputLabel>
            <Select
              label="Age"
              onChange={(e) => setBusinessID(e.target.value as number)}
            >
              {businessesData?.data &&
                businessesData.data.map((business: any) => (
                  <MenuItem key={business.id} value={business.id}>
                    {business.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        {!isLoadingBusiness ? (
          !isError ? (
            <List categories={businessData?.data.attributes.categories} />
          ) : (
            "Error is occurred"
          )
        ) : (
          "Loading"
        )}
      </Container>
      <Dialog
        maxWidth="md"
        open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      >
        <DialogTitle>New category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new category, please fill in all required fields.
          </DialogContentText>
          <AddCategoryForm
            businessId={businessID as number}
            successAction={() => handleSuccessAction()}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Prices;
