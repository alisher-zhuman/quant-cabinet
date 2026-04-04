import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

import { useCompaniesWidget } from "../../hooks/useCompaniesWidget";
import { CompaniesDialogs } from "../companies-dialogs";

export const CompaniesWidget = () => {
  const {
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
  } = useCompaniesWidget();

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

      <CompaniesDialogs
        t={t}
        companyToDelete={companyToDelete}
        companyToEdit={companyToEdit}
        isCreateDialogOpen={isCreateDialogOpen}
        isDeletePending={deleteCompanyMutation.isPending}
        onCloseDeleteDialog={onCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        onCloseCreateDialog={handleCloseCreateDialog}
        onEditSuccess={handleEditSuccess}
        onCreateSuccess={handleCreateSuccess}
      />
    </>
  );
};
