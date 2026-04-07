import type { TFunction } from "i18next";

import {
  ControllerFiltersDialog,
  CreateControllerDialog,
  TransferControllerDialog,
} from "@features/controllers";

import { type ControllerRow } from "@entities/controllers";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  companyId: string;
  isCreateDialogOpen: boolean;
  isFiltersDialogOpen: boolean;
  controllerToEdit: ControllerRow | null;
  controllerToDelete: ControllerRow | null;
  controllerToTransfer: ControllerRow | null;
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
  isDeletePending: boolean;
  onCloseCreateDialog: () => void;
  onCreateSuccess: () => void;
  onEditSuccess: () => void;
  onCloseFiltersDialog: () => void;
  onApplyFilters: (filters: {
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => void;
  onCloseTransferDialog: () => void;
  onTransferSuccess: () => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
}

export const CompanyControllersDialogs = ({
  t,
  companyId,
  isCreateDialogOpen,
  isFiltersDialogOpen,
  controllerToEdit,
  controllerToDelete,
  controllerToTransfer,
  serialNumber,
  phoneNumber,
  simIMSI,
  isDeletePending,
  onCloseCreateDialog,
  onCreateSuccess,
  onEditSuccess,
  onCloseFiltersDialog,
  onApplyFilters,
  onCloseTransferDialog,
  onTransferSuccess,
  onCloseDeleteDialog,
  onConfirmDelete,
}: Props) => (
  <>
    {isCreateDialogOpen && (
      <CreateControllerDialog
        controller={controllerToEdit}
        open={isCreateDialogOpen}
        onClose={onCloseCreateDialog}
        onSuccess={controllerToEdit ? onEditSuccess : onCreateSuccess}
        {...(!controllerToEdit ? { initialCompanyId: companyId } : {})}
      />
    )}

    {isFiltersDialogOpen && (
      <ControllerFiltersDialog
        open={isFiltersDialogOpen}
        filters={{
          serialNumber,
          phoneNumber,
          simIMSI,
          companyId: "",
        }}
        onClose={onCloseFiltersDialog}
        onApply={({
          serialNumber: nextSerialNumber,
          phoneNumber: nextPhoneNumber,
          simIMSI: nextSimIMSI,
        }) =>
          onApplyFilters({
            serialNumber: nextSerialNumber,
            phoneNumber: nextPhoneNumber,
            simIMSI: nextSimIMSI,
          })
        }
        hideCompanyField
      />
    )}

    {controllerToTransfer && (
      <TransferControllerDialog
        controller={controllerToTransfer}
        open={Boolean(controllerToTransfer)}
        onClose={onCloseTransferDialog}
        onSuccess={onTransferSuccess}
        initialCompanyId={companyId}
      />
    )}

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
  </>
);
