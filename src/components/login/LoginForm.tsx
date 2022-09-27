import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "hooks/auth";

import { Box, TextField, Typography, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type TForm = {
  identifier: "string";
  password: "string";
};

const LoginForm = () => {
  const { handleSubmit, control } = useForm<TForm>();

  const { login, isLoading, isError, error } = useLogin();

  const onSubmit = async ({ identifier, password }: TForm) => {
    await login({ identifier, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4">
          Welcome back
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Sign in on the internal platform
        </Typography>
      </Box>

      {isError && (
        <Alert severity="error">{error?.response.data.error.message}</Alert>
      )}
      <Controller
        name="identifier"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email or username"
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
        rules={{ required: "Email or username required" }}
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
          Sign In Now
        </LoadingButton>
      </Box>
      <Typography color="textSecondary" variant="body2">
        Don&apos;t have an account? <Link to="/register">Sign Up</Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
