import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ControllerRow } from "@entities/controllers";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  controller: ControllerRow;
  controllerId: string;
  controllerStatus: string;
  controllerType: string;
  archivedStatus: string;
  correctTimeLabel: string;
  correctIntervalLabel: string;
}

export const ControllerInfoSection = ({
  t,
  controller,
  controllerId,
  controllerStatus,
  controllerType,
  archivedStatus,
  correctTimeLabel,
  correctIntervalLabel,
}: Props) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle2" color="text.secondary">
      {t("controllers.details.sections.controller")}
    </Typography>

    <Box
      sx={{
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
        label={t("controllers.details.fields.batteryStatus")}
        value={`${controller.batteryStatus}%`}
      />
      <DetailRow
        label={t("controllers.details.fields.signalStatus")}
        value={`${controller.signalStatus}%`}
      />
      <DetailRow
        label={t("controllers.details.fields.isArchived")}
        value={archivedStatus}
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
          value={controllerId}
        />
      </Box>
    </Box>
  </Stack>
);
