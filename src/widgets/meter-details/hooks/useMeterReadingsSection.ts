import type { MeterDetails } from "@entities/meters";

import { useMeterReadingsChart } from "./useMeterReadingsChart";
import { useMeterReadingsFiltersState } from "./useMeterReadingsFiltersState";
import { useMeterReadingsTable } from "./useMeterReadingsTable";

interface Params {
  meter: MeterDetails;
}

export const useMeterReadingsSection = ({ meter }: Params) => {
  const { from, to, setFrom, setTo } = useMeterReadingsFiltersState();

  const port =
    meter.controller?.controllerType === "multiple" ? meter.port : undefined;

  const chart = useMeterReadingsChart({ meter, from, to });
  const table = useMeterReadingsTable({ meter, from, to });

  const handleFromChange = (value: string) => {
    setFrom(value);
  };

  const handleToChange = (value: string) => {
    setTo(value);
  };

  return {
    port,
    chartProps: {
      t: chart.t,
      isLoading: chart.isLoading,
      isError: chart.isError,
      errorText: chart.t("meters.readings.error"),
      emptyText: chart.emptyText,
      points: chart.points,
      minValue: chart.minValue,
      maxValue: chart.maxValue,
    },
    tableSectionProps: table.tableSectionProps,
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
