import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { COLORS } from "@shared/constants";

import { MeterReadingsChartTooltip } from "../meter-readings-chart-tooltip";

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
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography color="text.secondary">{title}</Typography>
        <Typography sx={{ mt: 2 }}>{subtitle}</Typography>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="error" sx={{ mt: 1 }}>
          {errorText}
        </Typography>
      </Paper>
    );
  }

  if (!points.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          {subtitle}
        </Typography>
        <Typography sx={{ mt: 2 }}>{emptyText}</Typography>
      </Paper>
    );
  }

  const firstPoint = points[0]!;
  const lastPoint = points[points.length - 1]!;

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

        <div>
          <Typography variant="caption" color="text.secondary">
            {yAxisLabel}
          </Typography>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={points}
              margin={{ top: 8, right: 8, left: -18, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.14} />
              <XAxis
                dataKey="axisLabel"
                tick={{ fontSize: 11 }}
                minTickGap={28}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                width={56}
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<MeterReadingsChartTooltip valueLabel={valueLabel} />}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COLORS.accent.teal}
                strokeWidth={2.5}
                dot={{ r: 2.5, strokeWidth: 0, fill: COLORS.accent.teal }}
                activeDot={{
                  r: 5,
                  fill: COLORS.accent.teal,
                  stroke: COLORS.accent.tealLight,
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 0.5, textAlign: "center" }}
          >
            {xAxisLabel}
          </Typography>
        </div>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
        >
          <Typography variant="body2" color="text.secondary">
            {`${pointsLabel}: ${points.length}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${rangeYLabel}: ${minValue.toFixed(2)} - ${maxValue.toFixed(2)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${rangeXLabel}: ${firstPoint.axisLabel} - ${lastPoint.axisLabel}`}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
