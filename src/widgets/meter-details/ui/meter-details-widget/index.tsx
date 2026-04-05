import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ROUTES } from "@shared/constants";
import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";
import { Loader } from "@shared/ui/loader";

import { useMeterDetailsWidget } from "../../hooks/useMeterDetailsWidget";

export const MeterDetailsWidget = () => {
  const {
    t,
    meterId,
    meter,
    isLoading,
    isError,
    meterStatus,
    valveStatus,
    pendingCommand,
    locationType,
    archivedStatus,
    valveLockStatus,
    controllerStatus,
    controllerType,
    controllerArchivedStatus,
    correctTimeLabel,
    correctIntervalLabel,
  } = useMeterDetailsWidget();

  if (isLoading) {
    return <Loader isFullscreen />;
  }

  if (isError || !meter) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{t("meters.error")}</Typography>

        <Button component={Link} to={`/${ROUTES.METERS}`} sx={{ mt: 2 }}>
          {t("meters.details.back")}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        width: "100%",
        maxWidth: "none",
      }}
    >
      <Button
        component={Link}
        to={`/${ROUTES.METERS}`}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
      >
        {t("meters.details.back")}
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="h4" fontWeight={700}>
              {meter.serialNumber}
            </Typography>

            <Typography color="text.secondary">
              {meter.clientName || meter.accountNumber || "-"}
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              {t("meters.details.sections.meter")}
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
                <DetailRow
                  label={t("meters.details.fields.id")}
                  value={meterId}
                />
              </Box>
            </Box>
          </Stack>

          {meter.controller && (
            <>
              <Divider />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t("meters.details.sections.controller")}
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
                    value={meter.controller.serialNumber}
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
                    value={`${meter.controller.batteryStatus}%`}
                  />
                  <DetailRow
                    label={t("controllers.details.fields.signalStatus")}
                    value={`${meter.controller.signalStatus}%`}
                  />
                  <DetailRow
                    label={t("controllers.details.fields.phoneNumber")}
                    value={meter.controller.phoneNumber || "-"}
                  />
                  <DetailRow
                    label={t("controllers.details.fields.simIMSI")}
                    value={meter.controller.simIMSI || "-"}
                  />
                  <DetailRow
                    label={t("controllers.details.fields.setInterval")}
                    value={String(meter.controller.setInterval ?? "-")}
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
                      value={meter.controller.descriptions || "-"}
                    />
                  </Box>
                  <DetailRow
                    label={t("controllers.details.fields.createdAt")}
                    value={formatDate(meter.controller.createdAt)}
                  />
                  <DetailRow
                    label={t("controllers.details.fields.updatedAt")}
                    value={
                      meter.controller.updatedAt
                        ? formatDate(meter.controller.updatedAt)
                        : "-"
                    }
                  />
                  <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
                    <DetailRow
                      label={t("controllers.details.fields.id")}
                      value={meter.controller.id}
                    />
                  </Box>
                </Box>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
