import { TableSection } from "@shared/ui/table-section";

import { useCompanyControllersTab } from "../../hooks/useCompanyControllersTab";
import { CompanyControllersDialogs } from "../company-controllers-dialogs";
import { CompanyControllersToolbar } from "../company-controllers-toolbar";

export const CompanyControllersTab = ({
  companyId,
  isActive,
}: {
  companyId: string;
  isActive: boolean;
}) => {
  const {
    t,
    isCreateDialogOpen,
    isFiltersDialogOpen,
    controllerToEdit,
    controllerToDelete,
    controllerToTransfer,
    isArchived,
    search,
    page,
    limit,
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    controllerColumns,
    serialNumber,
    phoneNumber,
    simIMSI,
    hasActiveFilters,
    handleResetFilters,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
    handleApplyFilters,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleCloseTransferDialog,
    handleTransferSuccess,
    handleControllerRowClick,
    deleteControllerMutation,
    setPage,
    setLimit,
  } = useCompanyControllersTab({
    companyId,
    isActive,
  });

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={t("controllers.error")}
        hasItems={hasControllers}
        emptyText={emptyText}
        rows={controllers}
        columns={controllerColumns}
        getRowId={(controller) => controller.id}
        onRowClick={handleControllerRowClick}
        toolbar={
          <CompanyControllersToolbar
            t={t}
            search={search}
            isSearchLoading={isFetching}
            isArchived={isArchived}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            onOpenFiltersDialog={handleOpenFiltersDialog}
            onOpenCreateDialog={handleOpenCreateDialog}
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
          labelRowsPerPage: t("controllers.table.rowsPerPage"),
        }}
      />

      <CompanyControllersDialogs
        t={t}
        companyId={companyId}
        isCreateDialogOpen={isCreateDialogOpen}
        isFiltersDialogOpen={isFiltersDialogOpen}
        controllerToEdit={controllerToEdit}
        controllerToDelete={controllerToDelete}
        controllerToTransfer={controllerToTransfer}
        serialNumber={serialNumber}
        phoneNumber={phoneNumber}
        simIMSI={simIMSI}
        deleteControllerMutationIsPending={deleteControllerMutation.isPending}
        handleCloseCreateDialog={handleCloseCreateDialog}
        handleCreateSuccess={handleCreateSuccess}
        handleEditSuccess={handleEditSuccess}
        handleCloseFiltersDialog={handleCloseFiltersDialog}
        handleApplyFilters={handleApplyFilters}
        handleCloseTransferDialog={handleCloseTransferDialog}
        handleTransferSuccess={handleTransferSuccess}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};
