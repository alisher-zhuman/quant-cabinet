import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  errorText: string;
}

export const MeterReadingsChartError = ({ title, errorText }: Props) => (
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
