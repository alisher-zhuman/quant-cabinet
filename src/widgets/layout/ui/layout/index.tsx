import { Outlet } from "react-router";

import Box from "@mui/material/Box";

import { LanguageSwitcher } from "@shared/ui/language-switcher";

export const Layout = () => (
  <Box minHeight="100vh" position="relative">
    <LanguageSwitcher sx={{ position: "absolute", top: 16, right: 16 }} />

    <Outlet />
  </Box>
);
