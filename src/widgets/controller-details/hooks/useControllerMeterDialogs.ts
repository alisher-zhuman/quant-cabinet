import { useCallback, useState } from "react";

import { useDeleteMeter } from "@features/meters";

import { type MeterRow } from "@entities/meters";

interface Params {
  setIsArchived: (value: boolean) => void;
  setPage: (value: number) => void;
}

export const useControllerMeterDialogs = ({
  setIsArchived,
  setPage,
}: Params) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);
  const [meterToEdit, setMeterToEdit] = useState<MeterRow | null>(null);

  const handleCloseDeleteDialog = () => {
    setMeterToDelete(null);
  };

  const deleteMeterMutation = useDeleteMeter(handleCloseDeleteDialog);

  const handleDeleteMeter = useCallback((meter: MeterRow) => {
    setMeterToDelete(meter);
  }, []);

  const handleEditMeter = useCallback((meter: MeterRow) => {
    setMeterToEdit(meter);
  }, []);

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setMeterToEdit(null);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditSuccess = useCallback(() => {
    setMeterToEdit(null);
  }, []);

  const handleConfirmDelete = () => {
    if (!meterToDelete) {
      return;
    }

    deleteMeterMutation.mutate({ id: meterToDelete.id });
  };

  return {
    isCreateDialogOpen,
    meterToDelete,
    meterToEdit,
    isDeletePending: deleteMeterMutation.isPending,
    handleDeleteMeter,
    handleEditMeter,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCloseEditDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  };
};
