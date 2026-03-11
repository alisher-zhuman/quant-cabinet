import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { COLORS } from "../../constants";

interface Props {
  title: string;
  description: string;
  reloadLabel: string;
  homeLabel: string;
  homeHref: string;
  error: Error | null;
  componentStack?: string;
  detailsTitle: string;
  errorMessageLabel: string;
  componentStackLabel: string;
  showTechnicalDetails?: boolean;
  onReload?: () => void;
}

export const ErrorFallback = ({
  title,
  description,
  reloadLabel,
  homeLabel,
  homeHref,
  error,
  componentStack,
  detailsTitle,
  errorMessageLabel,
  componentStackLabel,
  showTechnicalDetails = false,
  onReload,
}: Props) => {
  const resolvedComponentStack = componentStack?.trim();
  const hasTechnicalDetails = Boolean(
    showTechnicalDetails && (error?.message || resolvedComponentStack),
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: COLORS.neutral.white,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 720,
          border: `1px solid ${COLORS.neutral[200]}`,
          borderRadius: 4,
          padding: { xs: 3, sm: 4 },
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: COLORS.primary.light,
                color: COLORS.primary.dark,
              }}
            >
              <ReportProblemOutlinedIcon fontSize="medium" />
            </Box>

            <Stack spacing={1}>
              <Typography component="h1" variant="h4" fontWeight={700}>
                {title}
              </Typography>

              <Typography color="text.secondary" variant="body1">
                {description}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={onReload}
            >
              {reloadLabel}
            </Button>

            <Button
              component="a"
              href={homeHref}
              size="large"
              variant="outlined"
            >
              {homeLabel}
            </Button>
          </Stack>

          {hasTechnicalDetails && (
            <Stack
              spacing={1.5}
              sx={{
                borderRadius: 3,
                backgroundColor: COLORS.neutral[100],
                padding: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                {detailsTitle}
              </Typography>

              {error?.message && (
                <Stack spacing={0.5}>
                  <Typography variant="body2" fontWeight={700}>
                    {errorMessageLabel}
                  </Typography>

                  <Typography
                    component="pre"
                    sx={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
                      fontSize: 13,
                      color: COLORS.neutral[900],
                    }}
                    variant="body2"
                  >
                    {error.message}
                  </Typography>
                </Stack>
              )}

              {resolvedComponentStack && (
                <Stack spacing={0.5}>
                  <Typography variant="body2" fontWeight={700}>
                    {componentStackLabel}
                  </Typography>

                  <Typography
                    component="pre"
                    sx={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
                      fontSize: 13,
                      color: COLORS.neutral[900],
                    }}
                    variant="body2"
                  >
                    {resolvedComponentStack}
                  </Typography>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
