import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  label: string;
  value: string;
}

export const DetailRow = ({ label, value }: Props) => (
  <Typography
    variant="body1"
    sx={{
      wordBreak: "break-word",
      lineHeight: 1.65,
    }}
  >
    <Box component="span" sx={{ fontWeight: 700, color: "text.secondary" }}>
      {label}:
    </Box>{" "}
    <Box component="span">{value || "-"}</Box>
  </Typography>
);
