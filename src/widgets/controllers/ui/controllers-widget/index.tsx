import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

import { useControllersWidget } from "../../hooks/useControllersWidget";
import { ControllersDialogs } from "../controllers-dialogs";

export const ControllersWidget = () => {
  const {
    t,
    isCreateDialogOpen,
    isFiltersDialogOpen,
    controllerToEdit,
    controllerToTransfer,
    controllerToDelete,
    isArchived,
    search,
    page,
    limit,
    companyId,
    serialNumber,
    phoneNumber,
    simIMSI,
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    columns,
    hasActiveFilters,
    deleteControllerMutation,
    handleSearchChange,
    handleArchivedChange,
    handleOpenFiltersDialog,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCloseTransferDialog,
    handleCloseFiltersDialog,
    handleApplyFilters,
    handleConfirmDelete,
    handleCreateSuccess,
    handleEditSuccess,
    handleTransferSuccess,
    onCloseDeleteDialog,
    setPage,
    setLimit,
  } = useControllersWidget();

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}
      >
        <Typography component="h1" variant="h4">
          {t("controllers.title")}
        </Typography>

        <TableSection
          isLoading={isLoading}
          isError={isError}
          errorText={t("controllers.error")}
          hasItems={hasControllers}
          emptyText={emptyText}
          rows={controllers}
          columns={columns}
          getRowId={(controller) =>
            controller.serialNumber ?? controller.id ?? controller.createdAt
          }
          toolbar={
            <SearchTabsToolbar
              search={search}
              searchPlaceholder={t("controllers.search.placeholder")}
              activeLabel={t("controllers.tabs.active")}
              archivedLabel={t("controllers.tabs.archived")}
              isSearchLoading={isFetching}
              isArchived={isArchived}
              actions={
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  <Button
                    variant="outlined"
                    startIcon={
                      <Badge
                        color="primary"
                        overlap="circular"
                        variant="dot"
                        invisible={!hasActiveFilters}
                      >
                        <FilterListRoundedIcon />
                      </Badge>
                    }
                    onClick={handleOpenFiltersDialog}
                  >
                    {t("controllers.actions.filters")}
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={handleOpenCreateDialog}
                  >
                    {t("controllers.actions.create")}
                  </Button>
                </Box>
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
            labelRowsPerPage: t("controllers.table.rowsPerPage"),
          }}
        />
      </Box>

      <ControllersDialogs
        t={t}
        controllerToDelete={controllerToDelete}
        controllerToEdit={controllerToEdit}
        controllerToTransfer={controllerToTransfer}
        isCreateDialogOpen={isCreateDialogOpen}
        isFiltersDialogOpen={isFiltersDialogOpen}
        isDeletePending={deleteControllerMutation.isPending}
        filters={{
          companyId,
          serialNumber,
          phoneNumber,
          simIMSI,
        }}
        onCloseDeleteDialog={onCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        onCloseFiltersDialog={handleCloseFiltersDialog}
        onApplyFilters={handleApplyFilters}
        onCloseCreateDialog={handleCloseCreateDialog}
        onCloseTransferDialog={handleCloseTransferDialog}
        onCreateSuccess={handleCreateSuccess}
        onEditSuccess={handleEditSuccess}
        onTransferSuccess={handleTransferSuccess}
      />
    </>
  );
};
