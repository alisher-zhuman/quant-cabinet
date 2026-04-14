import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface BaseProps {
  title: string;
}

export const MeterReadingsChartLoading = ({ title }: BaseProps & { subtitle: string }) => (
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
    <Typography sx={{ mt: 2 }}>{title}</Typography>
  </Paper>
);

export const MeterReadingsChartError = ({ title, errorText }: BaseProps & { errorText: string }) => (
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

export const MeterReadingsChartEmpty = ({ title, subtitle, emptyText }: BaseProps & { subtitle: string; emptyText: string }) => (
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
