import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  CreateControllerDialog,
  TransferControllerDialog,
} from "@features/controllers";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { Loader } from "@shared/ui/loader";

import { useControllerDetailsWidget } from "../../hooks/useControllerDetailsWidget";
import { ControllerCompanySection } from "../controller-company-section";
import { ControllerInfoSection } from "../controller-info-section";

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
          {t("controllers.details.back")}
        </Button>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={handleOpenEditDialog}
          >
            {t("controllers.actions.edit")}
          </Button>

          <Button
            variant="outlined"
            startIcon={<SwapHorizRoundedIcon />}
            onClick={handleOpenTransferDialog}
          >
            {t("controllers.actions.transfer")}
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={handleOpenDeleteDialog}
          >
            {t("controllers.actions.delete")}
          </Button>
        </Box>
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
              {controller.serialNumber}
            </Typography>

            <Typography color="text.secondary">
              {controllerType} • {controllerStatus}
            </Typography>
          </Box>

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

      {isEditDialogOpen && (
        <CreateControllerDialog
          controller={controller}
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSuccess={handleEditSuccess}
        />
      )}

      {isTransferDialogOpen && (
        <TransferControllerDialog
          controller={controller}
          open={isTransferDialogOpen}
          onClose={handleCloseTransferDialog}
          onSuccess={handleTransferSuccess}
        />
      )}

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={t("controllers.deleteDialog.title")}
        description={t("controllers.deleteDialog.description")}
        cancelLabel={t("controllers.deleteDialog.cancel")}
        confirmLabel={t("controllers.deleteDialog.confirm")}
        isLoading={isDeletePending}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};
