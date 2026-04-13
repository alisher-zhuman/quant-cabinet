import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

import { AUTH_ROLES, COLORS } from "@shared/constants";
import type { UserRole } from "@shared/types";

interface Props {
  role: UserRole;
  label: string;
}

export const RoleBadge = ({ role, label }: Props) => {
  const toneStyles =
    role === AUTH_ROLES.ADMIN
      ? {
          color: COLORS.primary.dark,
          backgroundColor: alpha(COLORS.primary.main, 0.1),
        }
      : role === AUTH_ROLES.MANAGER
        ? {
            color: "#7C3AED",
            backgroundColor: alpha("#7C3AED", 0.1),
          }
        : {
            color: COLORS.system.success,
            backgroundColor: alpha(COLORS.system.success, 0.12),
          };

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.75,
        py: 0.625,
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...toneStyles,
      }}
    >
      {label}
    </Box>
  );
};
