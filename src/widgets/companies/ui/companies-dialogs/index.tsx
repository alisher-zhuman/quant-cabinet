import { type TFunction } from "i18next";

import { CreateCompanyDialog } from "@features/companies";

import { type CompanyRow } from "@entities/companies";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  companyToDelete: CompanyRow | null;
  companyToEdit: CompanyRow | null;
  isCreateDialogOpen: boolean;
  isDeletePending: boolean;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  onCloseCreateDialog: () => void;
  onEditSuccess: () => void;
  onCreateSuccess: () => void;
}

export const CompaniesDialogs = ({
  t,
  companyToDelete,
  companyToEdit,
  isCreateDialogOpen,
  isDeletePending,
  onCloseDeleteDialog,
  onConfirmDelete,
  onCloseCreateDialog,
  onEditSuccess,
  onCreateSuccess,
}: Props) => {
  return (
    <>
      <ConfirmDialog
        open={Boolean(companyToDelete)}
        title={t("companies.deleteDialog.title")}
        description={t("companies.deleteDialog.description")}
        cancelLabel={t("companies.deleteDialog.cancel")}
        confirmLabel={t("companies.deleteDialog.confirm")}
        isLoading={isDeletePending}
        onClose={onCloseDeleteDialog}
        onConfirm={onConfirmDelete}
      />

      <CreateCompanyDialog
        company={companyToEdit}
        open={isCreateDialogOpen}
        onClose={onCloseCreateDialog}
        onSuccess={companyToEdit ? onEditSuccess : onCreateSuccess}
      />
    </>
  );
};
