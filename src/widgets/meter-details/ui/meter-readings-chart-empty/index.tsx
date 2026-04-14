import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  subtitle: string;
  emptyText: string;
}

export const MeterReadingsChartEmpty = ({ title, subtitle, emptyText }: Props) => (
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
