import { type MouseEvent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { HEADER_NAVIGATION_ITEMS, ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";
import { LangSwitcher } from "@shared/ui/lang-switcher";

export const Header = () => {
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<HTMLElement | null>(null);

  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const isProfileMenuOpen = Boolean(profileMenuAnchor);

  const roleLabel =
    role === "admin" ? t("profile.roles.admin") : t("profile.roles.user");

  const onOpenProfileMenu = (event: MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const onCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
  };

  const onOpenResetPassword = () => {
    onCloseProfileMenu();
    navigate(`/${ROUTES.RESET_PASSWORD}`);
  };

  const onLogout = () => {
    onCloseProfileMenu();
    logout();
    navigate(`/${ROUTES.LOG_IN}`, { replace: true });
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Link
        to={`/${ROUTES.USERS}`}
        style={{
          textDecoration: "none",
          color: "#0F172A",
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: 0.2,
        }}
      >
        Quant Cabinet
      </Link>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#F1F5F9",
          padding: 4,
          borderRadius: 12,
        }}
      >
        {HEADER_NAVIGATION_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              padding: "8px 24px",
              color: isActive ? "#2563EB" : "#334155",
              textDecoration: "none",
              fontWeight: 600,
              background: isActive ? "#FFFFFF" : "transparent",
              borderRadius: 8,
            })}
          >
            {t(label)}
          </NavLink>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LangSwitcher />

        <IconButton
          aria-label={t("profile.label")}
          onClick={onOpenProfileMenu}
          sx={{
            cursor: "pointer",
            border: "1px solid",
            borderColor: "#2563EB",
            color: "#1D4ED8",
            bgcolor: "#EFF6FF",
          }}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
      </div>

      <Menu
        anchorEl={profileMenuAnchor}
        open={isProfileMenuOpen}
        onClose={onCloseProfileMenu}
      >
        <MenuItem disabled>
          <Typography variant="body2">
            {t("profile.roleLabel")}: {roleLabel}
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={onOpenResetPassword}>
          {t("profile.actions.resetPassword")}
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={onLogout}>
          {t("profile.actions.logout")}
        </MenuItem>
      </Menu>
    </header>
  );
};
