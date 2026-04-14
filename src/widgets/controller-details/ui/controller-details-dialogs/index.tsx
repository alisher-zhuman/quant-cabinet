import type { TFunction } from "i18next";

import {
  CreateControllerDialog,
  TransferControllerDialog,
} from "@features/controllers";

import type { ControllerRow } from "@entities/controllers";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  controller: ControllerRow;
  isEditDialogOpen: boolean;
  isTransferDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isDeletePending: boolean;
  onCloseEdit: () => void;
  onEditSuccess: () => void;
  onCloseTransfer: () => void;
  onTransferSuccess: () => void;
  onCloseDelete: () => void;
  onConfirmDelete: () => void;
}

export const ControllerDetailsDialogs = ({
  t,
  controller,
  isEditDialogOpen,
  isTransferDialogOpen,
  isDeleteDialogOpen,
  isDeletePending,
  onCloseEdit,
  onEditSuccess,
  onCloseTransfer,
  onTransferSuccess,
  onCloseDelete,
  onConfirmDelete,
}: Props) => (
  <>
    {isEditDialogOpen && (
      <CreateControllerDialog
        controller={controller}
        open={isEditDialogOpen}
        onClose={onCloseEdit}
        onSuccess={onEditSuccess}
      />
    )}

    {isTransferDialogOpen && (
      <TransferControllerDialog
        controller={controller}
        open={isTransferDialogOpen}
        onClose={onCloseTransfer}
        onSuccess={onTransferSuccess}
      />
    )}

    <ConfirmDialog
      open={isDeleteDialogOpen}
      title={t("controllers.deleteDialog.title")}
      description={t("controllers.deleteDialog.description")}
      cancelLabel={t("controllers.deleteDialog.cancel")}
      confirmLabel={t("controllers.deleteDialog.confirm")}
      isLoading={isDeletePending}
      onClose={onCloseDelete}
      onConfirm={onConfirmDelete}
    />
  </>
);
