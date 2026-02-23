import { Outlet } from "react-router";

import Box from "@mui/material/Box";

import { LangSwitcher } from "@shared/ui/lang-switcher";

export const Layout = () => (
  <Box minHeight="100vh" position="relative">
    <LangSwitcher sx={{ position: "absolute", top: 16, right: 16 }} />

    <Outlet />
  </Box>
);
