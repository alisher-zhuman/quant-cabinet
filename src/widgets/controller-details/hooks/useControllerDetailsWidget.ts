import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useDeleteController } from "@features/controllers";

import { useControllerQuery } from "@entities/controllers";

import { ROUTES } from "@shared/constants";
import { getBackTo } from "@shared/helpers";

export const useControllerDetailsWidget = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { controllerId = "" } = useParams<{ controllerId: string }>();
 
  const location = useLocation() as { state: unknown };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { controller, isLoading, isError } = useControllerQuery(controllerId);
 
  const backTo = getBackTo(location.state, `/${ROUTES.CONTROLLERS}`);

  const deleteControllerMutation = useDeleteController(() => {
    setIsDeleteDialogOpen(false);
    navigate(backTo);
  });

  const controllerStatus = controller?.controllerStatus
    ? t(`controllers.statuses.${controller.controllerStatus}`)
    : "-";

  const controllerType = controller?.controllerType
    ? t(`controllers.types.${controller.controllerType}`)
    : "-";

  const archivedStatus = controller?.isArchived
    ? t("controllers.details.values.archived")
    : t("controllers.details.values.active");

  const companyStatus = controller?.company?.isArchived
    ? t("controllers.details.values.archived")
    : t("controllers.details.values.active");

  const correctTimeLabel = controller?.correctTime
    ? t("controllers.details.values.yes")
    : t("controllers.details.values.no");

  const correctIntervalLabel = controller?.correctInterval
    ? t("controllers.details.values.yes")
    : t("controllers.details.values.no");

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
  };

  const handleOpenTransferDialog = () => {
    setIsTransferDialogOpen(true);
  };

  const handleCloseTransferDialog = () => {
    setIsTransferDialogOpen(false);
  };

  const handleTransferSuccess = () => {
    setIsTransferDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!controller?.id) {
      return;
    }

    deleteControllerMutation.mutate({ id: controller.id });
  };

  return {
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
    isDeletePending: deleteControllerMutation.isPending,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    handleOpenTransferDialog,
    handleCloseTransferDialog,
    handleTransferSuccess,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  };
};
