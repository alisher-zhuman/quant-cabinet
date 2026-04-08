import { type TFunction } from "i18next";

import {
  ControllerBulkUploadDialog,
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
  isBulkUploadDialogOpen: boolean;
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
  onCloseBulkUploadDialog: () => void;
  onCloseTransferDialog: () => void;
  onCreateSuccess: () => void;
  onBulkUploadSuccess: () => void;
  onEditSuccess: () => void;
  onTransferSuccess: () => void;
  initialCompanyId?: string;
}

export const ControllersDialogs = ({
  t,
  controllerToDelete,
  controllerToEdit,
  controllerToTransfer,
  isCreateDialogOpen,
  isBulkUploadDialogOpen,
  isFiltersDialogOpen,
  isDeletePending,
  filters,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseFiltersDialog,
  onApplyFilters,
  onCloseCreateDialog,
  onCloseBulkUploadDialog,
  onCloseTransferDialog,
  onCreateSuccess,
  onBulkUploadSuccess,
  onEditSuccess,
  onTransferSuccess,
  initialCompanyId,
}: Props) => (
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
        {...(initialCompanyId !== undefined ? { initialCompanyId } : {})}
      />
    )}

    {isBulkUploadDialogOpen && (
      <ControllerBulkUploadDialog
        open={isBulkUploadDialogOpen}
        onClose={onCloseBulkUploadDialog}
        onSuccess={onBulkUploadSuccess}
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
