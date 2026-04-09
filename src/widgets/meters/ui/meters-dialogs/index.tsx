import type { TFunction } from "i18next";

import { ControllerBulkUploadDialog } from "@features/controllers";
import {
  CreateMeterDialog,
  MeterFiltersDialog,
} from "@features/meters";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  meterToDelete: { id: string } | null;
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
  onCloseCreateDialog: () => void;
  onCloseBulkUploadDialog: () => void;
  onCloseFiltersDialog: () => void;
  onCreateSuccess: () => void;
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
}

export const MetersDialogs = ({
  t,
  meterToDelete,
  isDeletePending,
  isCreateDialogOpen,
  isBulkUploadDialogOpen,
  isFiltersDialogOpen,
  filters,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseCreateDialog,
  onCloseBulkUploadDialog,
  onCloseFiltersDialog,
  onCreateSuccess,
  onBulkUploadSuccess,
  onApplyFilters,
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

    {isCreateDialogOpen && (
      <CreateMeterDialog
        open={isCreateDialogOpen}
        onClose={onCloseCreateDialog}
        onSuccess={onCreateSuccess}
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
      />
    )}
  </>
);
