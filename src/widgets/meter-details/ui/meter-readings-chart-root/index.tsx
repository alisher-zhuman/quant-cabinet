import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Box from "@mui/material/Box";
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
  points: Point[];
  xAxisLabel: string;
  yAxisLabel: string;
  valueLabel: string;
}

export const MeterReadingsChartRoot = ({
  points,
  xAxisLabel,
  yAxisLabel,
  valueLabel,
}: Props) => (
  <Box>
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
  </Box>
);
