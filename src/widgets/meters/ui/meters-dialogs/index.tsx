import { type TFunction } from "i18next";

import { type MeterRow } from "@entities/meters";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  meterToDelete: MeterRow | null;
  isDeletePending: boolean;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
}

export const MetersDialogs = ({
  t,
  meterToDelete,
  isDeletePending,
  onCloseDeleteDialog,
  onConfirmDelete,
}: Props) => {
  return (
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
  );
};
