import type { TFunction } from "i18next";

import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import IconButton from "@mui/material/IconButton";

import type { CompanyRow } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

export const createCompanyColumns = (
  t: TFunction,
  onToggleArchive: (company: CompanyRow) => void,
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
      <IconButton
        aria-label={
          company.isArchived
            ? t("companies.actions.unarchive")
            : t("companies.actions.archive")
        }
        color={company.isArchived ? "success" : "warning"}
        onClick={() => onToggleArchive(company)}
      >
        {company.isArchived ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />}
      </IconButton>
    ),
  },
];
