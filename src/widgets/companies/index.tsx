import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  createCompanyColumns,
  CreateCompanyDialog,
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
import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

export const CompaniesWidget = () => {
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

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}
      >
        <Typography component="h1" variant="h4">
          {t("companies.title")}
        </Typography>

        <TableSection
          isLoading={isLoading}
          isError={isError}
          errorText={t("companies.error")}
          hasItems={hasCompanies}
          emptyText={emptyText}
          rows={companies}
          columns={columns}
          getRowId={(company) => company.id}
          onRowClick={handleRowClick}
          toolbar={
            <SearchTabsToolbar
              search={search}
              searchPlaceholder={t("companies.search.placeholder")}
              activeLabel={t("companies.tabs.active")}
              archivedLabel={t("companies.tabs.archived")}
              isSearchLoading={isFetching}
              isArchived={isArchived}
              actions={
                <Button
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={handleOpenCreateDialog}
                >
                  {t("companies.actions.create")}
                </Button>
              }
              onSearchChange={handleSearchChange}
              onArchivedChange={handleArchivedChange}
            />
          }
          pagination={{
            page,
            limit,
            total,
            onPageChange: setPage,
            onLimitChange: setLimit,
            labelRowsPerPage: t("companies.table.rowsPerPage"),
          }}
        />
      </Box>

      <ConfirmDialog
        open={Boolean(companyToDelete)}
        title={t("companies.deleteDialog.title")}
        description={t("companies.deleteDialog.description")}
        cancelLabel={t("companies.deleteDialog.cancel")}
        confirmLabel={t("companies.deleteDialog.confirm")}
        isLoading={deleteCompanyMutation.isPending}
        onClose={onCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />

      <CreateCompanyDialog
        company={companyToEdit}
        open={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
        onSuccess={companyToEdit ? handleEditSuccess : handleCreateSuccess}
      />
    </>
  );
};
