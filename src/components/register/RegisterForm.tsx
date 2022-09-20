import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSignUp } from "hooks/useSignUp";

import { Box, Button, Grid, TextField, Typography, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type TForm = {
  username: "string";
  email: "email";
  password: "string";
};

const RegisterForm = () => {
  const { handleSubmit, control } = useForm<TForm>();

  const { signUp, isLoading, isError, error } = useSignUp();

  const onSubmit = async ({ username, email, password }: TForm) => {
    await signUp({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4">
          QR Price List - Register here
        </Typography>
      </Box>

      {isError && (
        <Alert severity="error">{error?.response.data.error.message}</Alert>
      )}
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Username"
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
        rules={{ required: "Username is required" }}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )}
        rules={{ required: "Email is required" }}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )}
        rules={{ required: "Password required" }}
      />

      <Box sx={{ py: 2 }}>
        <LoadingButton variant="contained" type="submit" loading={isLoading}>
          Register
        </LoadingButton>
      </Box>
      <Typography color="textSecondary" variant="body2">
        Have an account? <Link to="/login">Sign In</Link>
      </Typography>
    </form>
  );
};

export default RegisterForm;
