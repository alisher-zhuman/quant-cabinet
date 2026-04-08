import { useState } from "react";

import {
  useDeleteController,
  useDownloadControllersTemplate,
} from "@features/controllers";

import type { ControllerRow } from "@entities/controllers";

export const useControllerDialogs = (
  setIsArchived: (value: boolean) => void,
) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);

  const downloadTemplateMutation = useDownloadControllersTemplate();

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

  const handleOpenBulkUploadDialog = () => {
    setIsBulkUploadDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleCloseBulkUploadDialog = () => {
    setIsBulkUploadDialogOpen(false);
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

  const handleBulkUploadSuccess = () => {
    setIsBulkUploadDialogOpen(false);
    setIsArchived(false);
  };

  return {
    isBulkUploadDialogOpen,
    isCreateDialogOpen,
    isFiltersDialogOpen,
    controllerToEdit,
    controllerToTransfer,
    controllerToDelete,
    deleteControllerMutation,
    isTemplateDownloadPending: downloadTemplateMutation.isPending,
    handleDownloadTemplate: () => {
      downloadTemplateMutation.mutate();
    },
    handleEditController,
    handleTransferController,
    handleOpenFiltersDialog,
    handleOpenCreateDialog,
    handleOpenBulkUploadDialog,
    handleCloseCreateDialog,
    handleCloseBulkUploadDialog,
    handleCloseTransferDialog,
    handleCloseFiltersDialog,
    handleConfirmDelete,
    handleCreateSuccess,
    handleEditSuccess,
    handleTransferSuccess,
    handleBulkUploadSuccess,
    handleCloseDeleteDialog,
    setControllerToDelete,
  };
};
