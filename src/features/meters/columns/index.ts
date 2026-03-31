import type { TFunction } from "i18next";

import type { MeterRow } from "@entities/meters";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

const getValveStatusLabel = (valveState: string, t: TFunction) => {
  if (valveState === "open") {
    return t("meters.valveStatus.open");
  }

  if (valveState === "closed") {
    return t("meters.valveStatus.closed");
  }

  if (valveState === "none") {
    return t("meters.valveStatus.none");
  }

  return valveState;
};

const getBatteryStatusLabel = (meterStatus: string, t: TFunction) => {
  if (meterStatus === "normal") {
    return t("meters.batteryStatus.normal");
  }

  if (meterStatus === "low") {
    return t("meters.batteryStatus.low");
  }

  if (meterStatus === "critical") {
    return t("meters.batteryStatus.critical");
  }

  return meterStatus;
};

export const createMeterColumns = (t: TFunction): Column<MeterRow>[] => [
  {
    id: "serialNumber",
    header: t("meters.table.columns.id"),
    cell: (meter) => meter.serialNumber || "-",
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
];
