import type { TFunction } from "i18next";

import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import type { CompanyRow } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

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
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <IconButton
          aria-label={
            company.isArchived
              ? t("companies.actions.unarchive")
              : t("companies.actions.archive")
          }
          color={company.isArchived ? "success" : "warning"}
          onClick={() => onToggleArchive(company)}
        >
          {company.isArchived ? (
            <UnarchiveOutlinedIcon />
          ) : (
            <ArchiveOutlinedIcon />
          )}
        </IconButton>

        <IconButton
          aria-label={t("companies.actions.delete")}
          color="error"
          onClick={() => onDelete(company)}
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
      </Box>
    ),
  },
];
