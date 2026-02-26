import { createTheme } from "@mui/material";

import { COLORS } from "@shared/constants";

export const THEME = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
      light: COLORS.primary.light,
      dark: COLORS.primary.dark,
      contrastText: COLORS.neutral.white,
    },
    text: {
      primary: COLORS.neutral[900],
      secondary: COLORS.neutral[600],
    },
    divider: COLORS.neutral[200],
    background: {
      default: COLORS.neutral[100],
      paper: COLORS.neutral.white,
    },
    success: {
      main: COLORS.system.success,
    },
    error: {
      main: COLORS.system.error,
    },
    warning: {
      main: COLORS.system.warning,
    },
    info: {
      main: COLORS.system.info,
    },
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.neutral.white,
        },
      },
    },
  },
});
