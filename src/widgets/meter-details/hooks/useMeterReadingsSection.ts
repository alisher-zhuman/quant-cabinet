import { useState } from "react";

import { useTranslation } from "react-i18next";

import type { MeterDetails } from "@entities/meters";
import { useReadingsQuery } from "@entities/readings";

import { usePagination } from "@shared/hooks";

import { createMeterReadingColumns } from "../columns";

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
      columns: createMeterReadingColumns(t),
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
