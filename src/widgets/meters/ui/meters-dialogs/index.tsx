import type { TFunction } from "i18next";

import { ControllerBulkUploadDialog } from "@features/controllers";
import {
  MeterDialog,
  MeterFiltersDialog,
} from "@features/meters";

import type { MeterRow } from "@entities/meters";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  meterToDelete: { id: string } | null;
  meterToEdit: MeterRow | null;
  isDeletePending: boolean;
  isCreateDialogOpen: boolean;
  isBulkUploadDialogOpen: boolean;
  isFiltersDialogOpen: boolean;
  filters: {
    companyId: string;
    locationType: string;
    meterStatus: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  };
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  onCloseEditDialog: () => void;
  onCloseCreateDialog: () => void;
  onCloseBulkUploadDialog: () => void;
  onCloseFiltersDialog: () => void;
  onCreateSuccess: () => void;
  onEditSuccess: () => void;
  onBulkUploadSuccess: () => void;
  onApplyFilters: (filters: {
    companyId: string;
    locationType: string;
    meterStatus: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => void;
  hideCompanyField?: boolean;
}

export const MetersDialogs = ({
  t,
  meterToDelete,
  meterToEdit,
  isDeletePending,
  isCreateDialogOpen,
  isBulkUploadDialogOpen,
  isFiltersDialogOpen,
  filters,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseEditDialog,
  onCloseCreateDialog,
  onCloseBulkUploadDialog,
  onCloseFiltersDialog,
  onCreateSuccess,
  onEditSuccess,
  onBulkUploadSuccess,
  onApplyFilters,
  hideCompanyField = false,
}: Props) => (
  <>
    <ConfirmDialog
      open={Boolean(meterToDelete)}
      title={t("meters.deleteDialog.title")}
      description={t("meters.deleteDialog.description")}
      cancelLabel={t("meters.deleteDialog.cancel")}
      confirmLabel={t("meters.deleteDialog.confirm")}
      isLoading={isDeletePending}
      onClose={onCloseDeleteDialog}
      onConfirm={onConfirmDelete}
    />

    {(isCreateDialogOpen || Boolean(meterToEdit)) && (
      <MeterDialog
        open={isCreateDialogOpen || Boolean(meterToEdit)}
        meter={meterToEdit}
        onClose={meterToEdit ? onCloseEditDialog : onCloseCreateDialog}
        onSuccess={meterToEdit ? onEditSuccess : onCreateSuccess}
      />
    )}

    {isBulkUploadDialogOpen && (
      <ControllerBulkUploadDialog
        open={isBulkUploadDialogOpen}
        onClose={onCloseBulkUploadDialog}
        onSuccess={onBulkUploadSuccess}
      />
    )}

    {isFiltersDialogOpen && (
      <MeterFiltersDialog
        open={isFiltersDialogOpen}
        filters={filters}
        onClose={onCloseFiltersDialog}
        onApply={onApplyFilters}
        hideCompanyField={hideCompanyField}
      />
    )}
  </>
);
