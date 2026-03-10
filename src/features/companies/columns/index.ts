import type { TFunction } from "i18next";

import type { CompanyRow } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

export const createCompanyColumns = (t: TFunction): Column<CompanyRow>[] => [
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
    cell: (company) => {
      const fullName =
        `${company.user?.firstName ?? ""} ${company.user?.lastName ?? ""}`.trim();

      return fullName || company.user?.email || "-";
    },
  },
  {
    id: "createdAt",
    header: t("companies.table.columns.createdAt"),
    cell: (company) => formatDate(company.createdAt),
  },
];
