import { Outlet } from "react-router";

import Box from "@mui/material/Box";

import { Header } from "../header";

export const Layout = () => (
  <Box minHeight="100vh" position="relative">
    <Header />

    <Outlet />
  </Box>
);
