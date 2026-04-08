import type { ChangeEvent } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { MeterDetails } from "@entities/meters";

import { TableSection } from "@shared/ui/table-section";

import { useMeterReadingsSection } from "../../hooks/useMeterReadingsSection";
import { MeterReadingsChart } from "../meter-readings-chart";

export const MeterReadingsSection = ({ meter }: { meter: MeterDetails }) => {
  const { chartProps, toolbarProps, tableSectionProps } = useMeterReadingsSection({
    meter,
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.info.light, 0.07)} 100%)`,
        boxShadow: (theme) => `0 18px 40px ${alpha(theme.palette.common.black, 0.05)}`,
      }}
    >
      <Stack spacing={2.5}>
        <MeterReadingsChart
          title={chartProps.t("meters.readings.chart.title")}
          subtitle={chartProps.t("meters.readings.chart.subtitle")}
          xAxisLabel={chartProps.t("meters.readings.chart.axes.x")}
          yAxisLabel={chartProps.t("meters.readings.chart.axes.y")}
          valueLabel={chartProps.t("meters.readings.chart.tooltip.value")}
          pointsLabel={chartProps.t("meters.readings.chart.summary.points")}
          rangeYLabel={chartProps.t("meters.readings.chart.summary.rangeY")}
          rangeXLabel={chartProps.t("meters.readings.chart.summary.rangeX")}
          isLoading={chartProps.isLoading}
          isError={chartProps.isError}
          errorText={chartProps.errorText}
          emptyText={chartProps.emptyText}
          points={chartProps.points}
          minValue={chartProps.minValue}
          maxValue={chartProps.maxValue}
        />

        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {chartProps.t("meters.readings.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {chartProps.t("meters.readings.subtitle")}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: (theme) => alpha(theme.palette.background.default, 0.9),
            border: "1px solid",
            borderColor: "divider",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
            gap: 1.5,
          }}
        >
          <TextField
            label={chartProps.t("meters.readings.filters.serialNumber")}
            value={toolbarProps.serialNumber}
            disabled
          />

          {typeof toolbarProps.port === "number" && (
            <TextField
              label={chartProps.t("meters.readings.filters.port")}
              value={String(toolbarProps.port)}
              disabled
            />
          )}

          <TextField
            label={chartProps.t("meters.readings.filters.from")}
            type="date"
            value={toolbarProps.from}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              toolbarProps.onFromChange(event.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label={chartProps.t("meters.readings.filters.to")}
            type="date"
            value={toolbarProps.to}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              toolbarProps.onToChange(event.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.5),
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <TableSection
            isLoading={tableSectionProps.isLoading}
            isError={tableSectionProps.isError}
            errorText={tableSectionProps.errorText}
            hasItems={tableSectionProps.hasItems}
            emptyText={tableSectionProps.emptyText}
            rows={tableSectionProps.rows}
            columns={tableSectionProps.columns}
            getRowId={(reading) => reading.id}
            pagination={tableSectionProps.pagination}
          />
        </Box>
      </Stack>
    </Paper>
  );
};
