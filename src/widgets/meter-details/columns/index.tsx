import type { TFunction } from "i18next";

import type { ReadingRow } from "@entities/readings";

import { formatDateTime } from "@shared/helpers";
import type { Column } from "@shared/types";

export const createMeterReadingColumns = (
  t: TFunction,
): Column<ReadingRow>[] => [
  {
    id: "readingAt",
    header: t("meters.readings.table.columns.readingAt"),
    cell: (reading) => formatDateTime(reading.readingAt),
  },
  {
    id: "value",
    header: t("meters.readings.table.columns.value"),
    cell: (reading) => reading.value || "-",
  },
  {
    id: "port",
    header: t("meters.readings.table.columns.port"),
    cell: (reading) => String(reading.port),
  },
  {
    id: "locationType",
    header: t("meters.readings.table.columns.locationType"),
    cell: (reading) => reading.locationType || "-",
  },
];
