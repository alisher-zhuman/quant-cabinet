import { useCallback, useState } from "react";

import { useDeleteCompany } from "@features/companies";

import { type CompanyRow } from "@entities/companies";

interface Params {
  setIsArchived: (value: boolean) => void;
  setPage: (value: number) => void;
}

export const useCompanyDialogs = ({ setIsArchived, setPage }: Params) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<CompanyRow | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<CompanyRow | null>(
    null,
  );

  const onCloseDeleteDialog = () => {
    setCompanyToDelete(null);
  };

  const deleteCompanyMutation = useDeleteCompany(onCloseDeleteDialog);

  const handleEditCompany = useCallback((company: CompanyRow) => {
    setCompanyToEdit(company);
    setIsCreateDialogOpen(true);
  }, []);

  const handleOpenCreateDialog = () => {
    setCompanyToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setCompanyToEdit(null);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setCompanyToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setCompanyToEdit(null);
  }, []);

  const handleConfirmDelete = () => {
    if (!companyToDelete) {
      return;
    }

    deleteCompanyMutation.mutate({ id: companyToDelete.id });
  };

  return {
    companyToDelete,
    deleteCompanyMutation,
    handleEditCompany,
    dialogProps: {
      companyToDelete,
      companyToEdit,
      isCreateDialogOpen,
      isDeletePending: deleteCompanyMutation.isPending,
      onCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
      onCloseCreateDialog: handleCloseCreateDialog,
      onEditSuccess: handleEditSuccess,
      onCreateSuccess: handleCreateSuccess,
    },
    toolbarProps: {
      onOpenCreateDialog: handleOpenCreateDialog,
    },
    setCompanyToDelete,
  };
};
