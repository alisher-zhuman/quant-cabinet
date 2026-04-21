import type { TFunction } from "i18next";

import { MeterDialog, MeterFiltersDialog } from "@features/meters";

import { type MeterRow } from "@entities/meters";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  meterToDelete: MeterRow | null;
  meterToEdit: MeterRow | null;
  isCreateDialogOpen: boolean;
  isDeletePending: boolean;
  isFiltersDialogOpen: boolean;
  filters: {
    companyId: string;
    controllerId: string;
    locationType: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  };
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  onCloseFiltersDialog: () => void;
  onApplyFilters: (filters: {
    locationType: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => void;
  onCloseCreateDialog: () => void;
  onCloseEditDialog: () => void;
  onEditSuccess: () => void;
  onCreateSuccess: () => void;
}

export const ControllerMetersDialogs = ({
  t,
  meterToDelete,
  meterToEdit,
  isCreateDialogOpen,
  isDeletePending,
  isFiltersDialogOpen,
  filters,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseFiltersDialog,
  onApplyFilters,
  onCloseCreateDialog,
  onCloseEditDialog,
  onEditSuccess,
  onCreateSuccess,
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

    {isFiltersDialogOpen && (
      <MeterFiltersDialog
        open={isFiltersDialogOpen}
        filters={filters}
        onClose={onCloseFiltersDialog}
        onApply={({
          locationType,
          accountNumber,
          clientName,
          address,
          isValveLockedByManager,
        }) =>
          onApplyFilters({
            locationType,
            accountNumber,
            clientName,
            address,
            isValveLockedByManager,
          })
        }
        hideCompanyField
      />
    )}

    {(isCreateDialogOpen || Boolean(meterToEdit)) && (
      <MeterDialog
        open={isCreateDialogOpen || Boolean(meterToEdit)}
        meter={meterToEdit}
        initialCompanyId={meterToEdit ? undefined : filters.companyId}
        initialControllerId={meterToEdit ? undefined : filters.controllerId}
        onClose={meterToEdit ? onCloseEditDialog : onCloseCreateDialog}
        onSuccess={meterToEdit ? onEditSuccess : onCreateSuccess}
      />
    )}
  </>
);
