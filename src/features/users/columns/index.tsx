import type { TFunction } from "i18next";

import type { UserRow } from "@entities/users";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

import { RoleBadge } from "../ui/role-badge";

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
    cell: (user) => (
      <RoleBadge role={user.role} label={t(`profile.roles.${user.role}`)} />
    ),
  },
  {
    id: "createdAt",
    header: t("users.table.columns.createdAt"),
    cell: (user) => formatDate(user.createdAt),
  },
];
