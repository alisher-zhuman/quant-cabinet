import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { CssBaseline, ThemeProvider } from "@mui/material";

import "./configs/i18n";

import { QUERY_CLIENT } from "./configs/query";
import { ROUTER } from "./router";
import { THEME } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider theme={THEME}>
        <Toaster />

        <CssBaseline />

        <RouterProvider router={ROUTER} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
