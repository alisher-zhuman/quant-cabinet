import { type MouseEvent, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";

export const ProfileMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  const { t } = useTranslation();
  
  const navigate = useNavigate();

  const isMenuOpen = Boolean(menuAnchor);
  const roleLabel =
    role === "admin" ? t("profile.roles.admin") : t("profile.roles.user");

  const onOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  const onOpenResetPassword = () => {
    onCloseMenu();
    navigate(`/${ROUTES.RESET_PASSWORD}`);
  };

  const onLogout = () => {
    onCloseMenu();
    logout();
    navigate(`/${ROUTES.LOG_IN}`, { replace: true });
  };

  return (
    <>
      <IconButton
        aria-label={t("profile.label")}
        onClick={onOpenMenu}
        sx={{
          border: "1px solid",
          borderColor: "#2563EB",
          color: "#1D4ED8",
          bgcolor: "#EFF6FF",
        }}
      >
        <AccountCircleOutlinedIcon />
      </IconButton>

      <Menu anchorEl={menuAnchor} open={isMenuOpen} onClose={onCloseMenu}>
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
    </>
  );
};
