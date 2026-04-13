import { Outlet } from "react-router";

import Box from "@mui/material/Box";

import { BottomNavbar } from "../bottom-navbar";
import { Header } from "../header";

export const Layout = () => (
  <Box minHeight="100vh" position="relative" pb={{ xs: 8, md: 0 }}>
    <Header />

    <Box component="main" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Outlet />
    </Box>

    <BottomNavbar />
  </Box>
);
