import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { ControllerRow } from "@entities/controllers";

interface Props {
  t: TFunction;
  controller: ControllerRow;
  controllerStatus: string;
  controllerType: string;
}

export const ControllerDetailsMainInfo = ({
  t,
  controller,
  controllerStatus,
  controllerType,
}: Props) => (
  <>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography
        variant="h4"
        fontWeight={700}
      >
        {controller.serialNumber}
      </Typography>

      <Typography color="text.secondary">
        {controllerType} • {controllerStatus}
      </Typography>
    </Box>

    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      sx={{ justifyContent: { sm: "flex-end" } }}
    >
      <Chip
        size="small"
        label={`${t("controllers.details.fields.controllerStatus")}: ${controllerStatus}`}
        sx={{
          borderRadius: 999,
          backgroundColor: (theme) => alpha(theme.palette.info.main, 0.10),
        }}
      />
      <Chip
        size="small"
        label={`${t("controllers.details.fields.controllerType")}: ${controllerType}`}
        sx={{
          borderRadius: 999,
          backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.14),
        }}
      />
    </Stack>
  </>
);
