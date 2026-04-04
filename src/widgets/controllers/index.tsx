import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  ControllerFiltersDialog,
  createControllerColumns,
  CreateControllerDialog,
  createControllersSearchString,
  parseControllersSearchState,
  useDeleteController,
} from "@features/controllers";

import { type ControllerRow, useControllersQuery } from "@entities/controllers";

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

export const ControllersWidget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);

  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseControllersSearchState);

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

  const [companyId, setCompanyId] = useState(initialSearchState.companyId);
  const [serialNumber, setSerialNumber] = useState(
    initialSearchState.serialNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState(initialSearchState.phoneNumber);
  const [simIMSI, setSimIMSI] = useState(initialSearchState.simIMSI);

  useSyncSearchParams(
    {
      page,
      limit,
      search,
      isArchived,
      companyId,
      serialNumber,
      phoneNumber,
      simIMSI,
    },
    createControllersSearchString,
  );

  const {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useControllersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    companyId,
    serialNumber,
    phoneNumber,
    simIMSI,
  });

  const onCloseDeleteDialog = () => {
    setControllerToDelete(null);
  };

  const deleteControllerMutation = useDeleteController(onCloseDeleteDialog);

  const columns = useMemo(
    () => createControllerColumns(t, setControllerToDelete),
    [t],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleOpenFiltersDialog = () => {
    setIsFiltersDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCloseFiltersDialog = () => {
    setIsFiltersDialogOpen(false);
  };

  const handleApplyFilters = ({
    companyId: nextCompanyId,
    serialNumber: nextSerialNumber,
    phoneNumber: nextPhoneNumber,
    simIMSI: nextSimIMSI,
  }: {
    companyId: string;
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => {
    setCompanyId(nextCompanyId);
    setSerialNumber(nextSerialNumber);
    setPhoneNumber(nextPhoneNumber);
    setSimIMSI(nextSimIMSI);
    setPage(0);
    setIsFiltersDialogOpen(false);
  };

  const hasActiveFilters = Boolean(
    companyId.trim() ||
      serialNumber.trim() ||
      phoneNumber.trim() ||
      simIMSI.trim(),
  );

  const handleConfirmDelete = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setIsArchived(false);
    setPage(0);
  };

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

      <ConfirmDialog
        open={Boolean(controllerToDelete)}
        title={t("controllers.deleteDialog.title")}
        description={t("controllers.deleteDialog.description")}
        cancelLabel={t("controllers.deleteDialog.cancel")}
        confirmLabel={t("controllers.deleteDialog.confirm")}
        isLoading={deleteControllerMutation.isPending}
        onClose={onCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />

      {isFiltersDialogOpen && (
        <ControllerFiltersDialog
          open={isFiltersDialogOpen}
          filters={{
            companyId,
            serialNumber,
            phoneNumber,
            simIMSI,
          }}
          onClose={handleCloseFiltersDialog}
          onApply={handleApplyFilters}
        />
      )}

      {isCreateDialogOpen && (
        <CreateControllerDialog
          open={isCreateDialogOpen}
          onClose={handleCloseCreateDialog}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
};
