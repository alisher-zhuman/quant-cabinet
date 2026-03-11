import type { TFunction } from "i18next";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import IconButton from "@mui/material/IconButton";

import type { ControllerRow } from "@entities/controllers";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

export const createControllerColumns = (
  t: TFunction,
  onDelete: (controller: ControllerRow) => void,
): Column<ControllerRow>[] => [
  {
    id: "id",
    header: t("controllers.table.columns.id"),
    cell: (controller) => controller.id,
  },
  {
    id: "company",
    header: t("controllers.table.columns.company"),
    cell: (controller) => controller.company?.name || "-",
  },
  {
    id: "metersCount",
    header: t("controllers.table.columns.metersCount"),
    cell: (controller) => controller.meters?.length ?? 0,
  },
  {
    id: "createdAt",
    header: t("controllers.table.columns.createdAt"),
    cell: (controller) => formatDate(controller.createdAt),
  },
  {
    id: "actions",
    header: t("controllers.table.columns.actions"),
    align: "right",
    cell: (controller) => (
      <IconButton
        aria-label={t("controllers.actions.delete")}
        color="error"
        onClick={() => onDelete(controller)}
      >
        <DeleteOutlineRoundedIcon />
      </IconButton>
    ),
  },
];
