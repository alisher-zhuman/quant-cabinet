import { type TFunction } from "i18next";

import {
  ControllerFiltersDialog,
  CreateControllerDialog,
  TransferControllerDialog,
} from "@features/controllers";

import { type ControllerRow } from "@entities/controllers";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  controllerToDelete: ControllerRow | null;
  controllerToEdit: ControllerRow | null;
  controllerToTransfer: ControllerRow | null;
  isCreateDialogOpen: boolean;
  isFiltersDialogOpen: boolean;
  isDeletePending: boolean;
  filters: {
    companyId: string;
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  };
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  onCloseFiltersDialog: () => void;
  onApplyFilters: (filters: {
    companyId: string;
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => void;
  onCloseCreateDialog: () => void;
  onCloseTransferDialog: () => void;
  onCreateSuccess: () => void;
  onEditSuccess: () => void;
  onTransferSuccess: () => void;
}

export const ControllersDialogs = ({
  t,
  controllerToDelete,
  controllerToEdit,
  controllerToTransfer,
  isCreateDialogOpen,
  isFiltersDialogOpen,
  isDeletePending,
  filters,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseFiltersDialog,
  onApplyFilters,
  onCloseCreateDialog,
  onCloseTransferDialog,
  onCreateSuccess,
  onEditSuccess,
  onTransferSuccess,
}: Props) => {
  return (
    <>
      <ConfirmDialog
        open={Boolean(controllerToDelete)}
        title={t("controllers.deleteDialog.title")}
        description={t("controllers.deleteDialog.description")}
        cancelLabel={t("controllers.deleteDialog.cancel")}
        confirmLabel={t("controllers.deleteDialog.confirm")}
        isLoading={isDeletePending}
        onClose={onCloseDeleteDialog}
        onConfirm={onConfirmDelete}
      />

      {isFiltersDialogOpen && (
        <ControllerFiltersDialog
          open={isFiltersDialogOpen}
          filters={filters}
          onClose={onCloseFiltersDialog}
          onApply={onApplyFilters}
        />
      )}

      {isCreateDialogOpen && (
        <CreateControllerDialog
          controller={controllerToEdit}
          open={isCreateDialogOpen}
          onClose={onCloseCreateDialog}
          onSuccess={controllerToEdit ? onEditSuccess : onCreateSuccess}
        />
      )}

      {Boolean(controllerToTransfer) && (
        <TransferControllerDialog
          controller={controllerToTransfer}
          open={Boolean(controllerToTransfer)}
          onClose={onCloseTransferDialog}
          onSuccess={onTransferSuccess}
        />
      )}
    </>
  );
};
