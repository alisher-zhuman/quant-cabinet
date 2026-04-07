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
  deleteControllerMutationIsPending: boolean;
  handleCloseCreateDialog: () => void;
  handleCreateSuccess: () => void;
  handleEditSuccess: () => void;
  handleCloseFiltersDialog: () => void;
  handleApplyFilters: (filters: {
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => void;
  handleCloseTransferDialog: () => void;
  handleTransferSuccess: () => void;
  handleCloseDeleteDialog: () => void;
  handleConfirmDelete: () => void;
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
  deleteControllerMutationIsPending,
  handleCloseCreateDialog,
  handleCreateSuccess,
  handleEditSuccess,
  handleCloseFiltersDialog,
  handleApplyFilters,
  handleCloseTransferDialog,
  handleTransferSuccess,
  handleCloseDeleteDialog,
  handleConfirmDelete,
}: Props) => (
  <>
    {isCreateDialogOpen && (
      <CreateControllerDialog
        controller={controllerToEdit}
        open={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
        onSuccess={controllerToEdit ? handleEditSuccess : handleCreateSuccess}
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
        onClose={handleCloseFiltersDialog}
        onApply={({
          serialNumber: nextSerialNumber,
          phoneNumber: nextPhoneNumber,
          simIMSI: nextSimIMSI,
        }) =>
          handleApplyFilters({
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
        onClose={handleCloseTransferDialog}
        onSuccess={handleTransferSuccess}
        initialCompanyId={companyId}
      />
    )}

    <ConfirmDialog
      open={Boolean(controllerToDelete)}
      title={t("controllers.deleteDialog.title")}
      description={t("controllers.deleteDialog.description")}
      cancelLabel={t("controllers.deleteDialog.cancel")}
      confirmLabel={t("controllers.deleteDialog.confirm")}
      isLoading={deleteControllerMutationIsPending}
      onClose={handleCloseDeleteDialog}
      onConfirm={handleConfirmDelete}
    />
  </>
);
