import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

import type { UserRow } from "@entities/users";

import { COLORS } from "@shared/constants";
import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

export const createUserColumns = (t: TFunction): Column<UserRow>[] => [
  {
    id: "email",
    header: t("users.table.columns.email"),
    cell: (user) => user.email,
  },
  {
    id: "firstName",
    header: t("users.table.columns.firstName"),
    cell: (user) => user.firstName || "-",
  },
  {
    id: "lastName",
    header: t("users.table.columns.lastName"),
    cell: (user) => user.lastName || "-",
  },
  {
    id: "role",
    header: t("users.table.columns.role"),
    align: "center",
    cell: (user) => {
      const isAdmin = user.role === "admin";
      const toneStyles = isAdmin
        ? {
            color: COLORS.primary.dark,
            backgroundColor: alpha(COLORS.primary.main, 0.1),
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
          {t(`profile.roles.${user.role}`)}
        </Box>
      );
    },
  },
  {
    id: "createdAt",
    header: t("users.table.columns.createdAt"),
    cell: (user) => formatDate(user.createdAt),
  },
];
