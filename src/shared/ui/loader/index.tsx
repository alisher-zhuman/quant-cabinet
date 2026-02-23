import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  isFullscreen?: boolean;
}

export const Loader = ({ isFullscreen = false }: Props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: isFullscreen ? "100vh" : "100%",
    }}
  >
    <CircularProgress />
  </Box>
);
