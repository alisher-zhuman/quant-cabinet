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
  meter: MeterDetails;
  meterId: string;
  meterStatus: string;
  valveStatus: string;
  pendingCommand: string;
  locationType: string;
  archivedStatus: string;
  valveLockStatus: string;
  role?: string | null;
}

export const MeterInfoSection = ({
  t,
  meter,
  meterId,
  meterStatus,
  valveStatus,
  pendingCommand,
  locationType,
  archivedStatus,
  valveLockStatus,
}: Props) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle2" color="text.secondary">
      {t("meters.details.sections.meter")}
    </Typography>

    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.85),
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
        label={t("meters.details.fields.serialNumber")}
        value={meter.serialNumber}
      />
      <DetailRow
        label={t("meters.details.fields.accountNumber")}
        value={meter.accountNumber || "-"}
      />
      <DetailRow
        label={t("meters.details.fields.clientName")}
        value={meter.clientName || "-"}
      />
      <DetailRow
        label={t("meters.details.fields.lastValue")}
        value={meter.lastValue || "-"}
      />
      <DetailRow
        label={t("meters.details.fields.meterStatus")}
        value={meterStatus}
      />
      <DetailRow
        label={t("meters.details.fields.valveState")}
        value={valveStatus}
      />
      <DetailRow
        label={t("meters.details.fields.pendingCommand")}
        value={pendingCommand}
      />
      <DetailRow
        label={t("meters.details.fields.locationType")}
        value={locationType}
      />
      <DetailRow
        label={t("meters.details.fields.port")}
        value={String(meter.port)}
      />
      <DetailRow
        label={t("meters.details.fields.isArchived")}
        value={archivedStatus}
      />
      <DetailRow
        label={t("meters.details.fields.isValveLockedByManager")}
        value={valveLockStatus}
      />
      <DetailRow
        label={t("meters.details.fields.address")}
        value={meter.address || "-"}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("meters.details.fields.descriptions")}
          value={meter.descriptions || "-"}
        />
      </Box>
      <DetailRow
        label={t("meters.details.fields.createdAt")}
        value={formatDate(meter.createdAt)}
      />
      <DetailRow
        label={t("meters.details.fields.updatedAt")}
        value={meter.updatedAt ? formatDate(meter.updatedAt) : "-"}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow label={t("meters.details.fields.id")} value={meterId} />
      </Box>
    </Box>
  </Stack>
);
