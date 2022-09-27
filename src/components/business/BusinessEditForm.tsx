import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUpdateBusiness } from "hooks/businesses";

type TInfoBusiness = {
  name: string;
  phone?: number;
};

const BusinessEditForm = ({ businessData }: { businessData: any }) => {
  console.log(
    "🚀 ~ file: BusinessEditForm.tsx ~ line 12 ~ BusinessEditForm ~ businessData",
    businessData
  );
  const { updateBusiness, isLoading, isError } = useUpdateBusiness();
  const { handleSubmit, control } = useForm<TInfoBusiness>({
    defaultValues: {
      name: businessData.data.attributes.name,
    },
  });

  const onSubmit = async ({ name }: { name: string }) => {
    await updateBusiness({ businessId: businessData.data.id, name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            name="phone"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Business sub title"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
            rules={{ required: "Business sub title required" }}
          />
        </Grid>
      </Grid>
      <Box mt={3}>
        <LoadingButton
          /* loading={isLoading} */ variant="contained"
          type="submit"
        >
          Save
        </LoadingButton>
      </Box>
    </form>
  );
};

export default BusinessEditForm;
