import type { TFunction } from "i18next";

import { MeterDialog } from "@features/meters";

import type { MeterRow } from "@entities/meters";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  meter: MeterRow;
  isDeleteDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeletePending: boolean;
  onCloseDelete: () => void;
  onConfirmDelete: () => void;
  onCloseEdit: () => void;
  onEditSuccess: () => void;
}

export const MeterDetailsDialogs = ({
  t,
  meter,
  isDeleteDialogOpen,
  isEditDialogOpen,
  isDeletePending,
  onCloseDelete,
  onConfirmDelete,
  onCloseEdit,
  onEditSuccess,
}: Props) => (
  <>
    <ConfirmDialog
      open={isDeleteDialogOpen}
      title={t("meters.deleteDialog.title")}
      description={t("meters.deleteDialog.description")}
      cancelLabel={t("meters.deleteDialog.cancel")}
      confirmLabel={t("meters.deleteDialog.confirm")}
      isLoading={isDeletePending}
      onClose={onCloseDelete}
      onConfirm={onConfirmDelete}
    />

    {isEditDialogOpen && (
      <MeterDialog
        open={isEditDialogOpen}
        meter={meter}
        onClose={onCloseEdit}
        onSuccess={onEditSuccess}
      />
    )}
  </>
);
