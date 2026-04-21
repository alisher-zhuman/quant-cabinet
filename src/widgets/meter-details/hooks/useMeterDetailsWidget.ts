import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useDeleteMeter } from "@features/meters";

import { useMeterQuery } from "@entities/meters";

import { ROUTE_PATHS } from "@shared/constants";
import { getBackTo } from "@shared/helpers";
import { useAuthStore } from "@shared/stores";

export const useMeterDetailsWidget = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { meterId = "" } = useParams<{ meterId: string }>();

  const location = useLocation() as { state: unknown };

  const role = useAuthStore((state) => state.role);

  const { meter, isLoading, isError } = useMeterQuery(meterId);

  const backTo = getBackTo(location.state, ROUTE_PATHS.METERS);

  const deleteMeterMutation = useDeleteMeter(() => {
    setIsDeleteDialogOpen(false);
    navigate(backTo);
  });

  const valveStatus = meter?.valveState
    ? t(`meters.valveStatus.${meter.valveState}`)
    : "-";

  const pendingCommand = meter?.pendingCommand
    ? t(`meters.details.pendingCommand.${meter.pendingCommand}`)
    : "-";

  const locationType = meter?.locationType
    ? t(`meters.details.locationType.${meter.locationType}`, {
        defaultValue: meter.locationType,
      })
    : "-";

  const archivedStatus = meter?.isArchived
    ? t("meters.details.values.archived")
    : t("meters.details.values.active");

  const valveLockStatus = meter?.isValveLockedByManager
    ? t("meters.details.values.yes")
    : t("meters.details.values.no");

  const companyStatus = meter?.company?.isArchived
    ? t("meters.details.values.archived")
    : t("meters.details.values.active");

  const controllerStatus = meter?.controller?.controllerStatus
    ? t(`controllers.statuses.${meter.controller.controllerStatus}`)
    : "-";

  const controllerType = meter?.controller?.controllerType
    ? t(`controllers.types.${meter.controller.controllerType}`)
    : "-";

  const controllerArchivedStatus = meter?.controller?.isArchived
    ? t("meters.details.values.archived")
    : t("meters.details.values.active");

  const correctTimeLabel = meter?.controller?.correctTime
    ? t("meters.details.values.yes")
    : t("meters.details.values.no");

  const correctIntervalLabel = meter?.controller?.correctInterval
    ? t("meters.details.values.yes")
    : t("meters.details.values.no");

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!meter?.id) {
      return;
    }

    deleteMeterMutation.mutate({ id: meter.id });
  };

  return {
    t,
    meterId,
    meter,
    backTo,
    isLoading,
    isError,
    role,
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
    isDeletePending: deleteMeterMutation.isPending,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
  };
};
