import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Grid, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUpdateBusiness } from "hooks/businesses";
import { TBusiness } from "types/businesses";

type TInfoBusiness = {
  name: string;
  short_name: string;
  location: string;
  phone: string;
  description: string;
};

const EditBusiness = ({ businessData }: { businessData: TBusiness }) => {
  const { updateBusiness, isLoading, isError } = useUpdateBusiness();
  const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<TInfoBusiness>({
    defaultValues: {
      name: businessData.attributes.name || "",
      short_name: businessData.attributes.short_name || "",
      location: businessData.attributes.location || "",
      phone: businessData.attributes.phone || "",
      description: businessData.attributes.description || "",
    },
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertSuccessOpen(false);
  };

  const onSubmit = async ({
    name,
    short_name,
    location,
    phone,
    description,
  }: TInfoBusiness) => {
    await updateBusiness(
      {
        businessId: businessData.id,
        name,
        short_name,
        location,
        phone,
        description,
      },
      {
        onSuccess: () => {
          setIsAlertSuccessOpen(true);
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Controller
              name="name"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              )}
              rules={{ required: "Business name required" }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="short_name"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Short name"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              )}
              rules={{ required: "Business phone required" }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="location"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Location"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              )}
              rules={{ required: "Business location required" }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="phone"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Phone number"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              )}
              rules={{ required: "Business phone required" }}
            />
          </Grid>
          <Grid item sm={12}>
            <Controller
              name="description"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Short description"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={isAlertSuccessOpen}
        key={"edit-business"}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Changes are successfully saved
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditBusiness;
