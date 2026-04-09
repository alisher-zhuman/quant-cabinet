import { useState } from "react";

import { useDownloadControllersTemplate } from "@features/controllers";
import { useDeleteMeter } from "@features/meters";

import { type MeterRow } from "@entities/meters";

export const useMeterDialogs = (setIsArchived: (value: boolean) => void) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [meterToEdit, setMeterToEdit] = useState<MeterRow | null>(null);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);

  const downloadTemplateMutation = useDownloadControllersTemplate();

  const onCloseDeleteDialog = () => {
    setMeterToDelete(null);
  };

  const deleteMeterMutation = useDeleteMeter(onCloseDeleteDialog);

  const handleConfirmDelete = () => {
    if (!meterToDelete) {
      return;
    }

    deleteMeterMutation.mutate({ id: meterToDelete.id });
  };

  return {
    isCreateDialogOpen,
    meterToEdit,
    setMeterToDelete,
    isBulkUploadDialogOpen,
    isFiltersDialogOpen,
    isTemplateDownloadPending: downloadTemplateMutation.isPending,
    deleteDialogProps: {
      meterToDelete,
      isDeletePending: deleteMeterMutation.isPending,
      onCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
    },
    editDialogProps: {
      meterToEdit,
      onCloseEditDialog: () => setMeterToEdit(null),
    },
    handleDownloadTemplate: () => {
      downloadTemplateMutation.mutate();
    },
    handleOpenCreateDialog: () => {
      setIsCreateDialogOpen(true);
    },
    handleCloseCreateDialog: () => {
      setIsCreateDialogOpen(false);
    },
    handleCreateSuccess: () => {
      setIsCreateDialogOpen(false);
      setIsArchived(false);
    },
    handleOpenEditDialog: (meter: MeterRow) => {
      setMeterToEdit(meter);
    },
    handleEditSuccess: () => {
      setMeterToEdit(null);
      setIsArchived(false);
    },
    handleOpenBulkUploadDialog: () => {
      setIsBulkUploadDialogOpen(true);
    },
    handleCloseBulkUploadDialog: () => {
      setIsBulkUploadDialogOpen(false);
    },
    handleBulkUploadSuccess: () => {
      setIsBulkUploadDialogOpen(false);
      setIsArchived(false);
    },
    handleOpenFiltersDialog: () => {
      setIsFiltersDialogOpen(true);
    },
    handleCloseFiltersDialog: () => {
      setIsFiltersDialogOpen(false);
    },
  };
};
