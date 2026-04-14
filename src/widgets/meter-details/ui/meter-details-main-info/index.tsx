import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { MeterDetails } from "@entities/meters";

interface Props {
  t: TFunction;
  meter: MeterDetails;
  meterStatus: string;
  locationType: string;
}

export const MeterDetailsMainInfo = ({
  t,
  meter,
  meterStatus,
  locationType,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      alignItems: { xs: "flex-start", lg: "flex-end" },
      justifyContent: "space-between",
      gap: 2,
      pb: 1,
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", letterSpacing: 1.2 }}
      >
        {t("meters.details.sections.meter")}
      </Typography>

      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ lineHeight: 1.1, letterSpacing: "-0.03em" }}
      >
        {meter.serialNumber}
      </Typography>

      <Typography color="text.secondary">
        {meter.clientName || meter.accountNumber || "-"}
      </Typography>
    </Box>

    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      sx={{ maxWidth: 480, justifyContent: { lg: "flex-end" } }}
    >
      <Chip
        size="small"
        label={`${t("meters.details.fields.meterStatus")}: ${meterStatus}`}
        sx={{
          borderRadius: 999,
          backgroundColor: (theme) => alpha(theme.palette.success.main, 0.12),
        }}
      />
      <Chip
        size="small"
        label={`${t("meters.details.fields.locationType")}: ${locationType}`}
        sx={{
          borderRadius: 999,
          backgroundColor: (theme) => alpha(theme.palette.info.main, 0.12),
        }}
      />
      <Chip
        size="small"
        label={`${t("meters.details.fields.lastValue")}: ${meter.lastValue || "-"}`}
        sx={{
          borderRadius: 999,
          backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.16),
        }}
      />
    </Stack>
  </Box>
);
