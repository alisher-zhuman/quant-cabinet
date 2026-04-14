import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import type { MeterDetails } from "@entities/meters";
import { useReadingsQuery } from "@entities/readings";

import type { ChartPoint } from "../types";

interface Params {
  meter: MeterDetails;
  from: string;
  to: string;
}

export const useMeterReadingsChart = ({ meter, from, to }: Params) => {
  const { t, i18n } = useTranslation();

  const port =
    meter.controller?.controllerType === "multiple" ? meter.port : undefined;

  const { readings, isLoading, isError } = useReadingsQuery({
    meterId: meter.id,
    serialNumber: meter.serialNumber,
    from,
    to,
    page: 0,
    limit: 500,
    ...(typeof port === "number" ? { port } : {}),
  });

  const shortDateTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [i18n.language],
  );

  const fullDateTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [i18n.language],
  );

  const points = useMemo<ChartPoint[]>(
    () =>
      [...readings]
        .map((reading) => {
          const value = Number(reading.value);
          const readingDate = new Date(reading.readingAt);

          return {
            id: reading.id,
            value,
            rawDate: reading.readingAt,
            axisLabel: shortDateTimeFormatter.format(readingDate),
            tooltipLabel: fullDateTimeFormatter.format(readingDate),
          };
        })
        .filter((point) => Number.isFinite(point.value))
        .sort(
          (left, right) =>
            new Date(left.rawDate).getTime() -
            new Date(right.rawDate).getTime(),
        ),
    [fullDateTimeFormatter, readings, shortDateTimeFormatter],
  );

  const minValue = points.length
    ? Math.min(...points.map((point) => point.value))
    : 0;
  const maxValue = points.length
    ? Math.max(...points.map((point) => point.value))
    : 0;

  return {
    t,
    isLoading,
    isError,
    hasPoints: points.length > 0,
    emptyText: t("meters.readings.chart.empty"),
    points,
    minValue,
    maxValue,
  };
};
