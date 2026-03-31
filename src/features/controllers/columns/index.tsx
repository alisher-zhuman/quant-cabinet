import type { TFunction } from "i18next";

import type { ControllerRow } from "@entities/controllers";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

import { ControllerActions } from "../ui/controller-actions";

export const createControllerColumns = (
  t: TFunction,
  onDelete: (controller: ControllerRow) => void,
): Column<ControllerRow>[] => [
  {
    id: "serialNumber",
    header: t("controllers.table.columns.id"),
    cell: (controller) => controller.serialNumber || "-",
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
      <ControllerActions
        controller={controller}
        deleteLabel={t("controllers.actions.delete")}
        onDelete={onDelete}
      />
    ),
  },
];
