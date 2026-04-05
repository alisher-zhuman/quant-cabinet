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

import { useControllerDetailsWidget } from "../../hooks/useControllerDetailsWidget";

export const ControllerDetailsWidget = () => {
  const {
    t,
    controllerId,
    controller,
    isLoading,
    isError,
    controllerStatus,
    controllerType,
    archivedStatus,
    companyStatus,
    correctTimeLabel,
    correctIntervalLabel,
  } = useControllerDetailsWidget();

  if (isLoading) {
    return <Loader isFullscreen />;
  }

  if (isError || !controller) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{t("controllers.error")}</Typography>

        <Button
          component={Link}
          to={`/${ROUTES.CONTROLLERS}`}
          sx={{ mt: 2 }}
        >
          {t("controllers.details.back")}
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
        to={`/${ROUTES.CONTROLLERS}`}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
      >
        {t("controllers.details.back")}
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
              {controller.serialNumber}
            </Typography>

            <Typography color="text.secondary">
              {controllerType} • {controllerStatus}
            </Typography>
          </Box>

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

          {controller.company && (
            <>
              <Divider />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t("controllers.details.sections.company")}
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
                    label={t("controllers.details.fields.companyName")}
                    value={controller.company.name ?? "-"}
                  />
                  <DetailRow
                    label={t("controllers.details.fields.companyStatus")}
                    value={companyStatus}
                  />
                  <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
                    <DetailRow
                      label={t("controllers.details.fields.companyAddress")}
                      value={controller.company.address || "-"}
                    />
                  </Box>
                  <DetailRow
                    label={t("controllers.details.fields.companyCreatedAt")}
                    value={
                      controller.company.createdAt
                        ? formatDate(controller.company.createdAt)
                        : "-"
                    }
                  />
                  <DetailRow
                    label={t("controllers.details.fields.companyUpdatedAt")}
                    value={
                      controller.company.updatedAt
                        ? formatDate(controller.company.updatedAt)
                        : "-"
                    }
                  />
                  <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
                    <DetailRow
                      label={t("controllers.details.fields.companyId")}
                      value={controller.company.id ?? "-"}
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
