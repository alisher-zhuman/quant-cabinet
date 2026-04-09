import type { TFunction } from "i18next";

import { MeterFiltersDialog } from "@features/meters";

import { type MeterRow } from "@entities/meters";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  meterToDelete: MeterRow | null;
  isDeletePending: boolean;
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
  onCloseFiltersDialog: () => void;
  onApplyFilters: (filters: {
    locationType: string;
    meterStatus: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => void;
}

export const ControllerMetersDialogs = ({
  t,
  meterToDelete,
  isDeletePending,
  isFiltersDialogOpen,
  filters,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseFiltersDialog,
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

    {isFiltersDialogOpen && (
      <MeterFiltersDialog
        open={isFiltersDialogOpen}
        filters={filters}
        onClose={onCloseFiltersDialog}
        onApply={({
          locationType,
          meterStatus,
          accountNumber,
          clientName,
          address,
          isValveLockedByManager,
        }) =>
          onApplyFilters({
            locationType,
            meterStatus,
            accountNumber,
            clientName,
            address,
            isValveLockedByManager,
          })
        }
        hideCompanyField
      />
    )}
  </>
);
