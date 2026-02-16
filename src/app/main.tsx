import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Toaster } from "react-hot-toast";

import { ROUTER } from "./router";
import { THEME } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={THEME}>
      <Toaster />

      <CssBaseline />

      <RouterProvider router={ROUTER} />
    </ThemeProvider>
  </StrictMode>,
);
