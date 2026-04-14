import { Link } from "react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { MeterRow } from "@entities/meters";

import { Loader } from "@shared/ui/loader";

import { useMeterDetailsWidget } from "../../hooks/useMeterDetailsWidget";
import { MeterCompanySection } from "../meter-company-section";
import { MeterControllerSection } from "../meter-controller-section";
import { MeterDetailsDialogs } from "../meter-details-dialogs";
import { MeterDetailsHeader } from "../meter-details-header";
import { MeterDetailsMainInfo } from "../meter-details-main-info";
import { MeterInfoSection } from "../meter-info-section";
import { MeterReadingsSection } from "../meter-readings-section";

export const MeterDetailsWidget = () => {
  const {
    t,
    meterId,
    meter,
    backTo,
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
    companyStatus,
    isDeleteDialogOpen,
    isEditDialogOpen,
    isDeletePending,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    role,
  } = useMeterDetailsWidget();

  if (isLoading) {
    return <Loader isFullscreen />;
  }

  if (isError || !meter) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{t("meters.error")}</Typography>

        <Button component={Link} to={backTo} sx={{ mt: 2 }}>
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
        background:
          "radial-gradient(circle at top left, rgba(16, 185, 129, 0.10), transparent 28%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.10), transparent 24%)",
      }}
    >
      <MeterDetailsHeader
        t={t}
        backTo={backTo}
        role={role}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
      />

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.success.light, 0.06)} 100%)`,
          boxShadow: (theme) =>
            `0 20px 50px ${alpha(theme.palette.common.black, 0.06)}`,
          overflow: "hidden",
        }}
      >
        <Stack spacing={3}>
          <MeterDetailsMainInfo
            t={t}
            meter={meter}
            meterStatus={meterStatus}
            locationType={locationType}
          />

          <Stack spacing={1.5}>
            <MeterInfoSection
              t={t}
              meter={meter}
              meterId={meterId}
              meterStatus={meterStatus}
              valveStatus={valveStatus}
              pendingCommand={pendingCommand}
              locationType={locationType}
              archivedStatus={archivedStatus}
              valveLockStatus={valveLockStatus}
              role={role}
            />
          </Stack>

          {meter.controller && (
            <>
              <Divider />
              <MeterControllerSection
                t={t}
                controller={meter.controller}
                controllerStatus={controllerStatus}
                controllerType={controllerType}
                controllerArchivedStatus={controllerArchivedStatus}
                correctTimeLabel={correctTimeLabel}
                correctIntervalLabel={correctIntervalLabel}
              />

              {meter.company && (
                <>
                  <Divider />
                  <MeterCompanySection
                    t={t}
                    company={meter.company}
                    companyStatus={companyStatus}
                  />
                </>
              )}
            </>
          )}
        </Stack>
      </Paper>

      <MeterReadingsSection meter={meter} />

      <MeterDetailsDialogs
        t={t}
        meter={meter as unknown as MeterRow}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        isDeletePending={isDeletePending}
        onCloseDelete={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        onCloseEdit={handleCloseEditDialog}
        onEditSuccess={handleEditSuccess}
      />
    </Box>
  );
};
