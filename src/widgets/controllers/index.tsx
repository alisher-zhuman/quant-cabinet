import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  createControllerColumns,
  useDeleteController,
} from "@features/controllers";

import { type ControllerRow, useControllersQuery } from "@entities/controllers";

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

export const ControllersWidget = () => {
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);

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

  const handleConfirmDelete = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
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
          getRowId={(controller) => controller.id}
          toolbar={
            <SearchTabsToolbar
              search={search}
              searchPlaceholder={t("controllers.search.placeholder")}
              activeLabel={t("controllers.tabs.active")}
              archivedLabel={t("controllers.tabs.archived")}
              isSearchLoading={isFetching}
              isArchived={isArchived}
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
    </>
  );
};
