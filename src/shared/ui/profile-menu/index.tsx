import { type MouseEvent, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { COLORS, ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";

export const ProfileMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const role = useAuthStore((state) => state.role);
  const logOut = useAuthStore((state) => state.logOut);

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
    logOut();
    navigate(`/${ROUTES.LOG_IN}`, { replace: true });
  };

  return (
    <>
      <IconButton
        aria-label={t("profile.label")}
        onClick={onOpenMenu}
        sx={{
          border: "1px solid",
          borderColor: COLORS.primary.main,
          color: COLORS.primary.dark,
          bgcolor: COLORS.primary.light,
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

        <MenuItem sx={{ color: COLORS.system.error }} onClick={onLogout}>
          {t("profile.actions.logOut")}
        </MenuItem>
      </Menu>
    </>
  );
};
