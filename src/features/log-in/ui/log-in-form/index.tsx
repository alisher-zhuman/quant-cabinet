import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useLogInForm } from "../../hooks/useLogInForm";

export const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    onSubmit,
  } = useLogInForm();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      bgcolor="grey.100"
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Typography variant="h5" component="h1" fontWeight={700}>
              Вход в кабинет
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <TextField
                label="Пароль"
                type="password"
                autoComplete="current-password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register("password")}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!isValid || isSubmitting}
            >
              Войти
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
