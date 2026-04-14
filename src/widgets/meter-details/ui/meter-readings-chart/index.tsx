import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { MeterReadingsChartFooter } from "../meter-readings-chart-footer";
import { MeterReadingsChartRoot } from "../meter-readings-chart-root";
import { MeterReadingsChartEmpty } from "../meter-readings-chart-empty";
import { MeterReadingsChartError } from "../meter-readings-chart-error";
import { MeterReadingsChartLoading } from "../meter-readings-chart-loading";

interface Point {
  id: string;
  value: number;
  axisLabel: string;
  tooltipLabel: string;
}

interface Props {
  title: string;
  subtitle: string;
  xAxisLabel: string;
  yAxisLabel: string;
  valueLabel: string;
  pointsLabel: string;
  rangeYLabel: string;
  rangeXLabel: string;
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  emptyText: string;
  points: Point[];
  minValue: number;
  maxValue: number;
}

export const MeterReadingsChart = ({
  title,
  subtitle,
  xAxisLabel,
  yAxisLabel,
  valueLabel,
  pointsLabel,
  rangeYLabel,
  rangeXLabel,
  isLoading,
  isError,
  errorText,
  emptyText,
  points,
  minValue,
  maxValue,
}: Props) => {
  if (isLoading) {
    return <MeterReadingsChartLoading title={title} subtitle={subtitle} />;
  }

  if (isError) {
    return <MeterReadingsChartError title={title} errorText={errorText} />;
  }

  if (!points.length) {
    return (
      <MeterReadingsChartEmpty
        title={title}
        subtitle={subtitle}
        emptyText={emptyText}
      />
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3.5,
        border: "1px solid",
        borderColor: "divider",
        background: (theme) =>
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.78)} 0%, ${alpha(theme.palette.info.light, 0.1)} 100%)`,
      }}
    >
      <Stack spacing={2}>
        <div>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        </div>

        <MeterReadingsChartRoot
          points={points}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          valueLabel={valueLabel}
        />

        <MeterReadingsChartFooter
          pointsLabel={pointsLabel}
          rangeYLabel={rangeYLabel}
          rangeXLabel={rangeXLabel}
          points={points}
          minValue={minValue}
          maxValue={maxValue}
        />
      </Stack>
    </Paper>
  );
};
