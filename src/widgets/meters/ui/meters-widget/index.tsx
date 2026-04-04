import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

import { useMetersWidget } from "../../hooks/useMetersWidget";

export const MetersWidget = () => {
  const {
    t,
    meterToDelete,
    isArchived,
    search,
    page,
    limit,
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
    columns,
    deleteMeterMutation,
    handleSearchChange,
    handleArchivedChange,
    handleConfirmDelete,
    onCloseDeleteDialog,
    setPage,
    setLimit,
  } = useMetersWidget();

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
