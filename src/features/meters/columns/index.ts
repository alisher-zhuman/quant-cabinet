import type { TFunction } from "i18next";

import type { MeterRow } from "@entities/meters";

import { formatDate } from "@shared/helpers";
import type { Column } from "@shared/types";

const getMeterStatusLabel = (valveState: string | undefined, t: TFunction) => {
  if (valveState === "open") {
    return t("meters.status.open");
  }

  if (valveState === "closed") {
    return t("meters.status.closed");
  }

  return valveState || "-";
};

export const createMeterColumns = (t: TFunction): Column<MeterRow>[] => [
  {
    id: "id",
    header: t("meters.table.columns.id"),
    cell: (meter) => meter.id,
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
    id: "status",
    header: t("meters.table.columns.status"),
    cell: (meter) => getMeterStatusLabel(meter.valveState, t),
  },
  {
    id: "createdAt",
    header: t("meters.table.columns.createdAt"),
    cell: (meter) => formatDate(meter.createdAt),
  },
];
