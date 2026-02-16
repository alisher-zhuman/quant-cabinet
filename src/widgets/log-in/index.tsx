import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { FormEvent } from "react";

export const LogInWidget = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <Typography variant="h5" component="h1" fontWeight={700}>
              Вход в кабинет
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                fullWidth
              />

              <TextField
                label="Пароль"
                type="password"
                name="password"
                autoComplete="current-password"
                fullWidth
              />
            </Stack>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Войти
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
