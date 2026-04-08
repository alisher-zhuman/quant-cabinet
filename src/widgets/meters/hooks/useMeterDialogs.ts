import { useState } from "react";

import { useDeleteMeter } from "@features/meters";

import { type MeterRow } from "@entities/meters";

export const useMeterDialogs = () => {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);

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
    setMeterToDelete,
    isFiltersDialogOpen,
    deleteDialogProps: {
      meterToDelete,
      isDeletePending: deleteMeterMutation.isPending,
      onCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
    },
    handleOpenFiltersDialog: () => {
      setIsFiltersDialogOpen(true);
    },
    handleCloseFiltersDialog: () => {
      setIsFiltersDialogOpen(false);
    },
  };
};
