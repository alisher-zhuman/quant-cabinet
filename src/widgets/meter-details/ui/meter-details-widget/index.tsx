import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
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
        background:
          "radial-gradient(circle at top left, rgba(16, 185, 129, 0.10), transparent 28%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.10), transparent 24%)",
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
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.success.light, 0.06)} 100%)`,
          boxShadow: (theme) => `0 20px 50px ${alpha(theme.palette.common.black, 0.06)}`,
          overflow: "hidden",
        }}
      >
        <Stack spacing={3}>
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
