import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Grid, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCreateBusiness } from "hooks/businesses";

type TCreateBusiness = {
  name: string;
  short_name: string;
};

const AddNewBusiness = ({ successAction }: { successAction: () => void }) => {
  const { createBusiness, isLoading, isError, error } = useCreateBusiness();

  const { handleSubmit, control } = useForm<TCreateBusiness>();

  const onSubmit = async ({ name, short_name }: TCreateBusiness) => {
    await createBusiness(
      { name, short_name },
      {
        onSuccess: () => {
          successAction();
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
                  label="Business name"
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
                  label="Business sub title"
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
              rules={{ required: "Business short name required" }}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Save
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};

export default AddNewBusiness;
