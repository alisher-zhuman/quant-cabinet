import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import {
  createCompanyColumns,
  useDeleteCompany,
} from "@features/companies";

import { type CompanyRow, useCompaniesQuery } from "@entities/companies";

import { ROUTES } from "@shared/constants";
import { createListSearchString, parseListSearchState } from "@shared/helpers";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

export const useCompaniesWidget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<CompanyRow | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<CompanyRow | null>(
    null,
  );

  const navigate = useNavigate();
  
  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseListSearchState);

  const { isArchived, setIsArchived } = useArchivedFilter({
    initialIsArchived: initialSearchState.isArchived,
  });

  const { search, debouncedSearch, setSearch } = useSearchState({
    initialSearch: initialSearchState.search,
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
  });

  useSyncSearchParams(
    { page, limit, search, isArchived },
    createListSearchString,
  );

  const {
    companies,
    total,
    hasCompanies,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useCompaniesQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
  });

  const onCloseDeleteDialog = () => {
    setCompanyToDelete(null);
  };

  const deleteCompanyMutation = useDeleteCompany(onCloseDeleteDialog);

  const handleEditCompany = useCallback((company: CompanyRow) => {
    setCompanyToEdit(company);
    setIsCreateDialogOpen(true);
  }, []);

  const columns = useMemo(
    () => createCompanyColumns(t, handleEditCompany, setCompanyToDelete),
    [t, handleEditCompany],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

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

  const handleRowClick = useCallback(
    (company: CompanyRow) => {
      navigate(`/${ROUTES.COMPANIES}/${company.id}`);
    },
    [navigate],
  );

  return {
    t,
    isCreateDialogOpen,
    companyToEdit,
    companyToDelete,
    isArchived,
    search,
    page,
    limit,
    companies,
    total,
    hasCompanies,
    emptyText,
    isLoading,
    isError,
    isFetching,
    columns,
    deleteCompanyMutation,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleConfirmDelete,
    handleRowClick,
    onCloseDeleteDialog,
    setPage,
    setLimit,
  };
};
