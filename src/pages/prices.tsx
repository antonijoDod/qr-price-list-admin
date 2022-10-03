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
import CategoriesList from "../components/price-list/CategoriesList";

import { useGetBusinesses } from "hooks/businesses";
import AddCategoryForm from "components/price-list/AddCategoryForm";

const Prices = () => {
  const [businessId, setBusinessId] = useState<number>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const { businessesData, isLoading, isError } = useGetBusinesses();

  /* Handle if form is successful submitted */
  const handleSuccessAction = () => {
    setIsOpenDialog(false);
  };

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Error occurred</div>;

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
              onChange={(e) => setBusinessId(e.target.value as number)}
            >
              {businessesData?.data &&
                businessesData.data.map((business) => (
                  <MenuItem key={business.id} value={business.id}>
                    {business.attributes.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        {businessId ? (
          <CategoriesList businessId={businessId as number} />
        ) : (
          "Select business"
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
            businessId={businessId as number}
            successAction={() => handleSuccessAction()}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Prices;
