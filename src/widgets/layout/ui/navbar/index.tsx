import { NavLink } from "react-router";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";

import { COLORS } from "@shared/constants";

import { NAVBAR_LINKS } from "./constants";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        width: { xs: "100%", md: "auto" },
        overflowX: "auto",
        flexWrap: "nowrap",
        backgroundColor: COLORS.neutral[100],
        px: { xs: 0.5, sm: 0.75 },
        py: 0.5,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {NAVBAR_LINKS.map(({ to, label }) => (
        <Box
          component={NavLink}
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          sx={{
            flex: "0 0 auto",
            px: { xs: 1.5, sm: 2.25 },
            py: { xs: 0.875, sm: 1 },
            color: COLORS.neutral[600],
            textDecoration: "none",
            fontSize: { xs: 14, sm: 15 },
            fontWeight: 600,
            lineHeight: 1,
            whiteSpace: "nowrap",
            borderRadius: 2,
            transition: "background-color 0.2s ease, color 0.2s ease",
            "&.active": {
              color: COLORS.primary.main,
              backgroundColor: COLORS.neutral.white,
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)",
            },
          }}
        >
          {t(label)}
        </Box>
      ))}
    </Box>
  );
};
