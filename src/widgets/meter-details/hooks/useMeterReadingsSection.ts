import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import type { MeterDetails } from "@entities/meters";
import { type ReadingRow, useReadingsQuery } from "@entities/readings";

import { formatDateTime } from "@shared/helpers";
import { usePagination } from "@shared/hooks";
import type { Column } from "@shared/types";

interface Params {
  meter: MeterDetails;
}

export const useMeterReadingsSection = ({ meter }: Params) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { t } = useTranslation();

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 0,
    initialLimit: 10,
    resetPage: 0,
  });

  const port =
    meter.controller?.controllerType === "multiple" ? meter.port : undefined;

  const {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useReadingsQuery({
    meterId: meter.id,
    serialNumber: meter.serialNumber,
    from,
    to,
    page,
    limit,
    ...(typeof port === "number" ? { port } : {}),
  });

  const columns = useMemo<Column<ReadingRow>[]>(
    () => [
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
    ],
    [t],
  );

  const handleFromChange = (value: string) => {
    setFrom(value);
    setPage(0);
  };

  const handleToChange = (value: string) => {
    setTo(value);
    setPage(0);
  };

  return {
    t,
    from,
    to,
    port,
    isFetching,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("meters.readings.error"),
      hasItems: hasReadings,
      emptyText,
      rows: readings,
      columns,
      pagination: {
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("meters.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      serialNumber: meter.serialNumber,
      from,
      to,
      port,
      onFromChange: handleFromChange,
      onToChange: handleToChange,
    },
  };
};
