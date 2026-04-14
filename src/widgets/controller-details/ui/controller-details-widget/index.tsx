import { Link } from "react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { Loader } from "@shared/ui/loader";

import { useControllerDetailsWidget } from "../../hooks/useControllerDetailsWidget";
import { ControllerCompanySection } from "../controller-company-section";
import { ControllerDetailsDialogs } from "../controller-details-dialogs";
import { ControllerDetailsHeader } from "../controller-details-header";
import { ControllerDetailsMainInfo } from "../controller-details-main-info";
import { ControllerInfoSection } from "../controller-info-section";
import { ControllerMetersSection } from "../controller-meters-section";

export const ControllerDetailsWidget = () => {
  const {
    t,
    controllerId,
    controller,
    backTo,
    isLoading,
    isError,
    controllerStatus,
    controllerType,
    archivedStatus,
    companyStatus,
    correctTimeLabel,
    correctIntervalLabel,
    isEditDialogOpen,
    isTransferDialogOpen,
    isDeleteDialogOpen,
    isDeletePending,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    handleOpenTransferDialog,
    handleCloseTransferDialog,
    handleTransferSuccess,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    role,
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
          to={backTo}
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
        background:
          "radial-gradient(circle at top left, rgba(14, 165, 233, 0.08), transparent 28%), radial-gradient(circle at top right, rgba(249, 115, 22, 0.08), transparent 24%)",
      }}
    >
      <ControllerDetailsHeader
        t={t}
        backTo={backTo}
        role={role}
        onEdit={handleOpenEditDialog}
        onTransfer={handleOpenTransferDialog}
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
            `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.info.light, 0.06)} 100%)`,
          boxShadow: (theme) =>
            `0 18px 40px ${alpha(theme.palette.common.black, 0.05)}`,
        }}
      >
        <Stack spacing={3}>
          <ControllerDetailsMainInfo
            t={t}
            controller={controller}
            controllerStatus={controllerStatus}
            controllerType={controllerType}
          />

          <Stack spacing={1.5}>
            <ControllerInfoSection
              t={t}
              controller={controller}
              controllerId={controllerId}
              controllerStatus={controllerStatus}
              controllerType={controllerType}
              archivedStatus={archivedStatus}
              correctTimeLabel={correctTimeLabel}
              correctIntervalLabel={correctIntervalLabel}
            />
          </Stack>

          {controller.company && (
            <>
              <Divider />

              <ControllerCompanySection
                t={t}
                controller={controller.company}
                companyStatus={companyStatus}
              />
            </>
          )}
        </Stack>
      </Paper>

      <ControllerMetersSection controllerId={controllerId} />

      <ControllerDetailsDialogs
        t={t}
        controller={controller}
        isEditDialogOpen={isEditDialogOpen}
        isTransferDialogOpen={isTransferDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeletePending={isDeletePending}
        onCloseEdit={handleCloseEditDialog}
        onEditSuccess={handleEditSuccess}
        onCloseTransfer={handleCloseTransferDialog}
        onTransferSuccess={handleTransferSuccess}
        onCloseDelete={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </Box>
  );
};
