import { NavLink, useLocation } from "react-router";

import { useTranslation } from "react-i18next";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import { useAuthStore } from "@shared/stores";

import { NAVBAR_LINKS } from "../../constants";

export const BottomNavbar = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const role = useAuthStore((state) => state.role);

  const filteredLinks = NAVBAR_LINKS.filter((link) => {
    if (!role) return false;
    return (link.allowedRoles as unknown as string[]).includes(role);
  });

  const activeValue = filteredLinks.findIndex((link) =>
    location.pathname.startsWith(link.to),
  );

  if (filteredLinks.length === 0) return null;

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={activeValue === -1 ? 0 : activeValue}
        sx={{
          height: 64,
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            padding: "6px 0",
          },
          "& .Mui-selected": {
            color: "primary.main",
          },
        }}
      >
        {filteredLinks.map((link, index) => (
          <BottomNavigationAction
            key={link.to}
            label={t(link.label)}
            icon={<link.icon />}
            component={NavLink}
            to={link.to}
            value={index}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
