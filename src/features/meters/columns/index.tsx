import type { TFunction } from "i18next";

import type { MeterRow } from "@entities/meters";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

import {
  getBatteryStatusLabel,
  getValveStatusLabel,
} from "../helpers";
import { MeterActions } from "../ui/meter-actions";

export const createMeterColumns = (
  t: TFunction,
  onDelete: (meter: MeterRow) => void,
): Column<MeterRow>[] => [
  {
    id: "serialNumber",
    header: t("meters.table.columns.id"),
    cell: (meter) => meter.serialNumber || "-",
  },
  {
    id: "clientName",
    header: t("meters.table.columns.clientName"),
    cell: (meter) => meter.clientName || "-",
  },
  {
    id: "accountNumber",
    header: t("meters.table.columns.accountNumber"),
    cell: (meter) => meter.accountNumber || "-",
  },
  {
    id: "company",
    header: t("meters.table.columns.company"),
    cell: (meter) => meter.company?.name || "-",
  },
  {
    id: "lastValue",
    header: t("meters.table.columns.lastValue"),
    cell: (meter) => meter.lastValue || "-",
  },
  {
    id: "readings",
    header: t("meters.table.columns.readings"),
    cell: (meter) => meter.readings,
  },
  {
    id: "batteryStatus",
    header: t("meters.table.columns.batteryStatus"),
    cell: (meter) => getBatteryStatusLabel(meter.meterStatus, t),
  },
  {
    id: "valveStatus",
    header: t("meters.table.columns.valveStatus"),
    cell: (meter) => getValveStatusLabel(meter.valveState, t),
  },
  {
    id: "createdAt",
    header: t("meters.table.columns.createdAt"),
    cell: (meter) => formatDate(meter.createdAt),
  },
  {
    id: "actions",
    header: t("meters.table.columns.actions"),
    align: "right",
    cell: (meter) => (
      <MeterActions
        deleteLabel={t("meters.actions.delete")}
        meter={meter}
        onDelete={onDelete}
      />
    ),
  },
];
