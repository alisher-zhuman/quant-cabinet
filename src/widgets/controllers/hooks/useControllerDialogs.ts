import { useState } from "react";

import { useDeleteController } from "@features/controllers";

import type { ControllerRow } from "@entities/controllers";

export const useControllerDialogs = (setIsArchived: (value: boolean) => void) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);

  const handleCloseDeleteDialog = () => {
    setControllerToDelete(null);
  };

  const deleteControllerMutation = useDeleteController(handleCloseDeleteDialog);

  const handleEditController = (controller: ControllerRow) => {
    setControllerToEdit(controller);
    setIsCreateDialogOpen(true);
  };

  const handleTransferController = (controller: ControllerRow) => {
    setControllerToTransfer(controller);
  };

  const handleOpenFiltersDialog = () => {
    setIsFiltersDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setControllerToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleCloseTransferDialog = () => {
    setControllerToTransfer(null);
  };

  const handleCloseFiltersDialog = () => {
    setIsFiltersDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
    setIsArchived(false);
  };

  const handleEditSuccess = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleTransferSuccess = () => {
    setControllerToTransfer(null);
  };

  return {
    isCreateDialogOpen,
    isFiltersDialogOpen,
    controllerToEdit,
    controllerToTransfer,
    controllerToDelete,
    deleteControllerMutation,
    handleEditController,
    handleTransferController,
    handleOpenFiltersDialog,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCloseTransferDialog,
    handleCloseFiltersDialog,
    handleConfirmDelete,
    handleCreateSuccess,
    handleEditSuccess,
    handleTransferSuccess,
    handleCloseDeleteDialog,
    setControllerToDelete,
  };
};
