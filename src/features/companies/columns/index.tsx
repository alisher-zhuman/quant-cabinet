import type { TFunction } from "i18next";

import type { CompanyRow } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

import { CompanyActions } from "../ui/company-actions";

export const createCompanyColumns = (
  t: TFunction,
  onEdit: (company: CompanyRow) => void,
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
    hiddenOnMobile: true,
  },
  {
    id: "createdAt",
    header: t("companies.table.columns.createdAt"),
    cell: (company) => formatDate(company.createdAt),
    hiddenOnMobile: true,
  },
  {
    id: "actions",
    header: t("companies.table.columns.actions"),
    align: "right",
    cell: (company) => (
      <CompanyActions
        company={company}
        editLabel={t("companies.actions.edit")}
        deleteLabel={t("companies.actions.delete")}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
