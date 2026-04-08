import { useTranslation } from "react-i18next";

import type { MeterDetails } from "@entities/meters";
import { useReadingsQuery } from "@entities/readings";

import { usePagination } from "@shared/hooks";

import { createMeterReadingColumns } from "../columns";

interface Params {
  meter: MeterDetails;
  from: string;
  to: string;
}

export const useMeterReadingsTable = ({ meter, from, to }: Params) => {
  const { t } = useTranslation();

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 0,
    initialLimit: 10,
    resetPage: 0,
  });

  const port =
    meter.controller?.controllerType === "multiple" ? meter.port : undefined;

  const { readings, total, hasReadings, emptyText, isLoading, isError } =
    useReadingsQuery({
      meterId: meter.id,
      serialNumber: meter.serialNumber,
      from,
      to,
      page,
      limit,
      ...(typeof port === "number" ? { port } : {}),
    });

  return {
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
  };
};
