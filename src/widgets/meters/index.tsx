import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { createMeterColumns, useDeleteMeter } from "@features/meters";

import { type MeterRow, useMetersQuery } from "@entities/meters";

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

export const MetersWidget = () => {
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);
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
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useMetersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
  });

  const onCloseDeleteDialog = () => {
    setMeterToDelete(null);
  };

  const deleteMeterMutation = useDeleteMeter(onCloseDeleteDialog);

  const columns = useMemo(() => createMeterColumns(t, setMeterToDelete), [t]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleConfirmDelete = () => {
    if (!meterToDelete) {
      return;
    }

    deleteMeterMutation.mutate({ id: meterToDelete.id });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
        <Typography component="h1" variant="h4">
          {t("meters.title")}
        </Typography>

        <TableSection
          isLoading={isLoading}
          isError={isError}
          errorText={t("meters.error")}
          hasItems={hasMeters}
          emptyText={emptyText}
          rows={meters}
          columns={columns}
          getRowId={(meter) => meter.id}
          toolbar={
            <SearchTabsToolbar
              search={search}
              searchPlaceholder={t("meters.search.placeholder")}
              activeLabel={t("meters.tabs.active")}
              archivedLabel={t("meters.tabs.archived")}
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
            labelRowsPerPage: t("meters.table.rowsPerPage"),
          }}
        />
      </Box>

      <ConfirmDialog
        open={Boolean(meterToDelete)}
        title={t("meters.deleteDialog.title")}
        description={t("meters.deleteDialog.description")}
        cancelLabel={t("meters.deleteDialog.cancel")}
        confirmLabel={t("meters.deleteDialog.confirm")}
        isLoading={deleteMeterMutation.isPending}
        onClose={onCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
