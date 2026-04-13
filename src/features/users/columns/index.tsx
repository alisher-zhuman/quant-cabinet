import type { TFunction } from "i18next";

import type { UserRow } from "@entities/users";

import { formatDate, isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";
import type { Column } from "@shared/types";

import { RoleBadge } from "../ui/role-badge";
import { UserActions } from "../ui/user-actions";

export const createUserColumns = (
  t: TFunction,
  onEdit: (user: UserRow) => void,
  onDelete: (user: UserRow) => void,
  options: {
    showCompanyColumn?: boolean;
    currentRole?: UserRole | null | undefined;
  } = {},
): Column<UserRow>[] => [
  {
    id: "email",
    header: t("users.table.columns.email"),
    cell: (user) => user.email,
  },
  {
    id: "fullName",
    header: t("users.table.columns.fullName"),
    cell: (user) => [user.firstName, user.lastName].filter(Boolean).join(" ") || "-",
  },
  ...(options.showCompanyColumn !== false
    ? [
        {
          id: "company",
          header: t("users.table.columns.company"),
          cell: (user: UserRow) => user.company?.name || "-",
        } as Column<UserRow>,
      ]
    : []),
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
  ...(!isUser(options.currentRole)
    ? [
        {
          id: "actions",
          header: t("users.table.columns.actions"),
          align: "right",
          cell: (user: UserRow) => (
            <UserActions
              editLabel={t("users.actions.edit")}
              deleteLabel={t("users.actions.delete")}
              onEdit={onEdit}
              onDelete={onDelete}
              user={user}
              currentRole={options.currentRole}
            />
          ),
        } as Column<UserRow>,
      ]
    : []),
];
