import { type MouseEvent, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { RoleBadge } from "@features/users";

import { COLORS, ROUTES } from "@shared/constants";
import { useAuthStore } from "@shared/stores";

export const ProfileMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const role = useAuthStore((state) => state.role);
  const logOut = useAuthStore((state) => state.logOut);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const isMenuOpen = Boolean(menuAnchor);
  const roleLabel = role ? t(`profile.roles.${role}`) : "-";

  const onOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  const onOpenForgotPassword = () => {
    onCloseMenu();
    navigate(`/${ROUTES.FORGOT_PASSWORD}`);
  };

  const onLogout = () => {
    onCloseMenu();
    logOut();
    navigate(`/${ROUTES.LOG_IN}`, { replace: true });
  };

  return (
    <>
      <Avatar
        onClick={onOpenMenu}
        sx={{
          width: 40,
          height: 40,
          cursor: "pointer",
          backgroundColor: alpha(COLORS.primary.main, 0.1),
          color: COLORS.primary.main,
          border: "2px solid",
          borderColor: isMenuOpen ? COLORS.primary.main : alpha(COLORS.primary.main, 0.2),
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: COLORS.primary.main,
            backgroundColor: alpha(COLORS.primary.main, 0.15),
            transform: "scale(1.05)",
          },
        }}
      >
        <PersonRoundedIcon />
      </Avatar>

      <Menu
        anchorEl={menuAnchor}
        open={isMenuOpen}
        onClose={onCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: "16px",
            overflow: "visible",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center" }}>
           {role && <RoleBadge role={role} label={roleLabel} />}
        </Box>

        <Divider sx={{ my: 1, opacity: 0.6 }} />

        <MenuItem 
          onClick={onOpenForgotPassword}
          sx={{ 
            py: 1.25,
            px: 2,
            borderRadius: "8px", 
            mx: 1,
            mb: 0.5,
            "&:hover": { backgroundColor: alpha(COLORS.primary.main, 0.05) } 
          }}
        >
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <VpnKeyRoundedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="body2" fontWeight={500}>
            {t("profile.actions.forgotPassword")}
          </Typography>
        </MenuItem>

        <MenuItem 
          onClick={onLogout}
          sx={{ 
            py: 1.25,
            px: 2,
            borderRadius: "8px", 
            mx: 1,
            color: COLORS.system.error,
            "&:hover": { backgroundColor: alpha(COLORS.system.error, 0.05) } 
          }}
        >
          <ListItemIcon sx={{ minWidth: "36px !important" }}>
            <LogoutRoundedIcon fontSize="small" sx={{ color: COLORS.system.error }} />
          </ListItemIcon>
          <Typography variant="body2" fontWeight={500}>
            {t("profile.actions.logOut")}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
