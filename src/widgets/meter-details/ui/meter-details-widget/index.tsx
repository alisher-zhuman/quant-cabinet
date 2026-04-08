import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { Loader } from "@shared/ui/loader";

import { useMeterDetailsWidget } from "../../hooks/useMeterDetailsWidget";
import { MeterControllerSection } from "../meter-controller-section";
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
    isDeleteDialogOpen,
    isDeletePending,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1.5,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          component={Link}
          to={backTo}
          variant="text"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
        >
          {t("meters.details.back")}
        </Button>

        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteOutlineRoundedIcon />}
          onClick={handleOpenDeleteDialog}
          sx={{ width: "fit-content", alignSelf: { xs: "flex-start", sm: "auto" } }}
        >
          {t("meters.actions.delete")}
        </Button>
      </Box>

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
            </>
          )}
        </Stack>
      </Paper>

      <MeterReadingsSection meter={meter} />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={t("meters.deleteDialog.title")}
        description={t("meters.deleteDialog.description")}
        cancelLabel={t("meters.deleteDialog.cancel")}
        confirmLabel={t("meters.deleteDialog.confirm")}
        isLoading={isDeletePending}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};
