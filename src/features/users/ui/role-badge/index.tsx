import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

import { COLORS } from "@shared/constants";
import { isAdmin, isManager } from "@shared/helpers";
import type { UserRole } from "@shared/types";

interface Props {
  role: UserRole;
  label: string;
}

export const RoleBadge = ({ role, label }: Props) => {
  const toneStyles =
    isAdmin(role)
      ? {
          color: COLORS.primary.dark,
          backgroundColor: alpha(COLORS.primary.main, 0.1),
        }
      : isManager(role)
        ? {
            color: COLORS.accent.purple,
            backgroundColor: alpha(COLORS.accent.purple, 0.1),
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
