import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Point {
  id: string;
  value: number;
  axisLabel: string;
  tooltipLabel: string;
}

interface Props {
  pointsLabel: string;
  rangeYLabel: string;
  rangeXLabel: string;
  points: Point[];
  minValue: number;
  maxValue: number;
}

export const MeterReadingsChartFooter = ({
  pointsLabel,
  rangeYLabel,
  rangeXLabel,
  points,
  minValue,
  maxValue,
}: Props) => {
  const firstPoint = points[0]!;
  const lastPoint = points[points.length - 1]!;

  return (
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
  );
};
