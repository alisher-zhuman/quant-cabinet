import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  active?: boolean;
  payload?: Array<{
    payload?: {
      tooltipLabel?: string;
      value?: number;
    };
  }>;
  valueLabel: string;
}

export const MeterReadingsChartTooltip = ({
  active,
  payload,
  valueLabel,
}: Props) => {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload as
    | {
        tooltipLabel?: string;
        value?: number;
      }
    | undefined;

  if (!point) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        px: 1.25,
        py: 0.75,
        minWidth: 160,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {point.tooltipLabel ?? "-"}
      </Typography>
      <Typography variant="body2" fontWeight={700}>
        {`${valueLabel}: ${point.value ?? "-"}`}
      </Typography>
    </Paper>
  );
};
