import type { TFunction } from "i18next";

import BatteryFullRoundedIcon from "@mui/icons-material/BatteryFullRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import type { ControllerRow } from "@entities/controllers";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

import { ControllerActions } from "../ui/controller-actions";

const getStatusColor = (status?: string | null) => {
  if (status === "normal") return "success.main";
  if (status === "error") return "error.main";
  return "text.disabled";
};

export const createControllerColumns = (
  t: TFunction,
  onEdit: (controller: ControllerRow) => void,
  onTransfer: (controller: ControllerRow) => void,
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
    id: "statusAndSignal",
    header: t("controllers.table.columns.statusAndSignal"),
    cell: (controller) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title={controller.controllerStatus || "Offline"}>
          <CircleRoundedIcon
            sx={{ fontSize: 12, color: getStatusColor(controller.controllerStatus) }}
          />
        </Tooltip>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SignalCellularAltRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          <Typography variant="body2">{controller.signalStatus ?? 0}%</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "battery",
    header: t("controllers.table.columns.battery"),
    cell: (controller) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <BatteryFullRoundedIcon
          sx={{
            fontSize: 18,
            color:
              (controller.batteryStatus ?? 0) > 20 ? "success.main" : "error.main",
          }}
        />
        <Typography variant="body2">{controller.batteryStatus ?? 0}%</Typography>
      </Box>
    ),
  },
  {
    id: "controllerType",
    header: t("controllers.table.columns.controllerType"),
    cell: (controller) => (
      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
        {controller.controllerType || "-"}
      </Typography>
    ),
  },
  {
    id: "setInterval",
    header: t("controllers.table.columns.setInterval"),
    cell: (controller) => (controller.setInterval ? `${controller.setInterval} ч` : "-"),
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
        editLabel={t("controllers.actions.edit")}
        transferLabel={t("controllers.actions.transfer")}
        deleteLabel={t("controllers.actions.delete")}
        onEdit={onEdit}
        onTransfer={onTransfer}
        onDelete={onDelete}
      />
    ),
  },
];
