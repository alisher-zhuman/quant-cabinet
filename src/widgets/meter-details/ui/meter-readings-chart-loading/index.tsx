import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  subtitle: string;
}

export const MeterReadingsChartLoading = ({ title, subtitle }: Props) => (
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
