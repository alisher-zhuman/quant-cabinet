import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getReadings } from "../api";
import { readingsKeys } from "../model/keys";
import type { ReadingRow } from "../model/types";

interface Params {
  meterId: string;
  serialNumber: string;
  port?: number;
  from: string;
  to: string;
  page: number;
  limit: number;
  enabled?: boolean;
}

export const useReadingsQuery = ({
  meterId,
  serialNumber,
  port,
  from,
  to,
  page,
  limit,
  enabled = true,
}: Params) => {
  const { t } = useTranslation();

  const normalizedMeterId = meterId.trim();
  const normalizedSerialNumber = serialNumber.trim();
  const normalizedFrom = from.trim();
  const normalizedTo = to.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    enabled: enabled && Boolean(normalizedMeterId && normalizedSerialNumber),
    queryKey: readingsKeys.list(
      normalizedMeterId,
      normalizedSerialNumber,
      port,
      normalizedFrom,
      normalizedTo,
      page,
      limit,
    ),
    queryFn: () =>
      getReadings({
        meterId: normalizedMeterId,
        serialNumber: normalizedSerialNumber,
        from: normalizedFrom,
        to: normalizedTo,
        page: page + 1,
        limit,
        ...(typeof port === "number" ? { port } : {}),
      }),
  });

  const readings: ReadingRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasReadings = readings.length > 0;
  const hasFilters = Boolean(normalizedFrom || normalizedTo);

  const emptyText = hasFilters
    ? t("meters.readings.empty.filtered")
    : t("meters.readings.empty.default");

  return {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
