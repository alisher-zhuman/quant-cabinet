import { useCallback, useState } from "react";

import { useDeleteController } from "@features/controllers";

import {
  type ControllerRow,
} from "@entities/controllers";

interface Params {
  setIsArchived: (value: boolean) => void;
  setPage: (value: number) => void;
}

export const useCompanyControllerDialogs = ({
  setIsArchived,
  setPage,
}: Params) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);

  const handleCloseDeleteDialog = () => {
    setControllerToDelete(null);
  };

  const deleteControllerMutation = useDeleteController(handleCloseDeleteDialog);

  const handleDeleteController = useCallback((controller: ControllerRow) => {
    setControllerToDelete(controller);
  }, []);

  const handleEditController = useCallback((controller: ControllerRow) => {
    setControllerToEdit(controller);
    setIsCreateDialogOpen(true);
  }, []);

  const handleTransferController = useCallback((controller: ControllerRow) => {
    setControllerToTransfer(controller);
  }, []);

  const handleOpenCreateDialog = () => {
    setControllerToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  }, []);

  const handleConfirmDelete = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
  };

  const handleCloseTransferDialog = () => {
    setControllerToTransfer(null);
  };

  const handleTransferSuccess = useCallback(() => {
    setControllerToTransfer(null);
    setPage(0);
  }, [setPage]);

  return {
    isCreateDialogOpen,
    controllerToEdit,
    controllerToDelete,
    controllerToTransfer,
    isDeletePending: deleteControllerMutation.isPending,
    handleDeleteController,
    handleEditController,
    handleTransferController,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseTransferDialog,
    handleTransferSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  };
};
