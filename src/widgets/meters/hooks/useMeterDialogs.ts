import { useState } from "react";

import { useDeleteMeter } from "@features/meters";

import { type MeterRow } from "@entities/meters";

export const useMeterDialogs = () => {
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
    deleteDialogProps: {
      meterToDelete,
      isDeletePending: deleteMeterMutation.isPending,
      onCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
    },
  };
};
