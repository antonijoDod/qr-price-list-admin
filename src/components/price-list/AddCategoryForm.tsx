import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCreateCategory } from "hooks/useCategory";

type TCreateCategory = {
  name: string;
};

const AddCategoryForm = ({
  businessId,
  successAction,
}: {
  businessId: number;
  successAction: () => void;
}) => {
  const { createCategory } = useCreateCategory();
  const { handleSubmit, control } = useForm<TCreateCategory>();

  const onSubmit = async ({ name }: { name: string }) => {
    await createCategory({ name, businessId: businessId });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item md={6} xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Category name"
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
            rules={{ required: "Category name required" }}
          />
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
    </>
  );
};

export default AddCategoryForm;
