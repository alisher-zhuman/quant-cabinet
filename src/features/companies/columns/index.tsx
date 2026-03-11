import type { TFunction } from "i18next";

import type { CompanyRow } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

import { CompanyActions } from "../ui/company-actions";

export const createCompanyColumns = (
  t: TFunction,
  onToggleArchive: (company: CompanyRow) => void,
  onDelete: (company: CompanyRow) => void,
): Column<CompanyRow>[] => [
  {
    id: "name",
    header: t("companies.table.columns.name"),
    cell: (company) => company.name || "-",
  },
  {
    id: "address",
    header: t("companies.table.columns.address"),
    cell: (company) => company.address || "-",
  },
  {
    id: "user",
    header: t("companies.table.columns.user"),
    cell: (company) => company.user?.email || "-",
  },
  {
    id: "createdAt",
    header: t("companies.table.columns.createdAt"),
    cell: (company) => formatDate(company.createdAt),
  },
  {
    id: "actions",
    header: t("companies.table.columns.actions"),
    align: "right",
    cell: (company) => (
      <CompanyActions
        company={company}
        archiveLabel={t("companies.actions.archive")}
        unarchiveLabel={t("companies.actions.unarchive")}
        deleteLabel={t("companies.actions.delete")}
        onToggleArchive={onToggleArchive}
        onDelete={onDelete}
      />
    ),
  },
];
