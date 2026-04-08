import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { MeterDetails } from "@entities/meters";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  controller: NonNullable<MeterDetails["controller"]>;
  controllerStatus: string;
  controllerType: string;
  controllerArchivedStatus: string;
  correctTimeLabel: string;
  correctIntervalLabel: string;
}

export const MeterControllerSection = ({
  t,
  controller,
  controllerStatus,
  controllerType,
  controllerArchivedStatus,
  correctTimeLabel,
  correctIntervalLabel,
}: Props) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle2" color="text.secondary">
      {t("meters.details.sections.controller")}
    </Typography>

    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: (theme) => alpha(theme.palette.info.light, 0.08),
        border: "1px solid",
        borderColor: "divider",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "repeat(2, minmax(0, 1fr))",
        },
        gap: 1.25,
      }}
    >
      <DetailRow
        label={t("controllers.details.fields.serialNumber")}
        value={controller.serialNumber}
      />
      <DetailRow
        label={t("controllers.details.fields.controllerType")}
        value={controllerType}
      />
      <DetailRow
        label={t("controllers.details.fields.controllerStatus")}
        value={controllerStatus}
      />
      <DetailRow
        label={t("controllers.details.fields.isArchived")}
        value={controllerArchivedStatus}
      />
      <DetailRow
        label={t("controllers.details.fields.batteryStatus")}
        value={`${controller.batteryStatus}%`}
      />
      <DetailRow
        label={t("controllers.details.fields.signalStatus")}
        value={`${controller.signalStatus}%`}
      />
      <DetailRow
        label={t("controllers.details.fields.phoneNumber")}
        value={controller.phoneNumber || "-"}
      />
      <DetailRow
        label={t("controllers.details.fields.simIMSI")}
        value={controller.simIMSI || "-"}
      />
      <DetailRow
        label={t("controllers.details.fields.setInterval")}
        value={String(controller.setInterval ?? "-")}
      />
      <DetailRow
        label={t("controllers.details.fields.correctTime")}
        value={correctTimeLabel}
      />
      <DetailRow
        label={t("controllers.details.fields.correctInterval")}
        value={correctIntervalLabel}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("controllers.details.fields.descriptions")}
          value={controller.descriptions || "-"}
        />
      </Box>
      <DetailRow
        label={t("controllers.details.fields.createdAt")}
        value={formatDate(controller.createdAt)}
      />
      <DetailRow
        label={t("controllers.details.fields.updatedAt")}
        value={controller.updatedAt ? formatDate(controller.updatedAt) : "-"}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("controllers.details.fields.id")}
          value={controller.id}
        />
      </Box>
    </Box>
  </Stack>
);
