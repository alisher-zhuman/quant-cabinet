import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns } from "@features/meters";

import { type MeterRow, useMetersQuery } from "@entities/meters";

import { ROUTES } from "@shared/constants";
import { createListSearchString, parseListSearchState } from "@shared/helpers";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

import { useMeterDialogs } from "./useMeterDialogs";

export const useMetersWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const { setMeterToDelete, deleteDialogProps } = useMeterDialogs();

  const columns = useMemo(
    () => createMeterColumns(t, setMeterToDelete),
    [setMeterToDelete, t],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleRowClick = useCallback(
    (meter: MeterRow) => {
      navigate(`/${ROUTES.METERS}/${meter.id}`, {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("meters.error"),
      hasItems: hasMeters,
      emptyText,
      rows: meters,
      columns,
      onRowClick: handleRowClick,
      pagination: {
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("meters.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search,
      isSearchLoading: isFetching,
      isArchived,
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    deleteDialogProps: {
      t,
      ...deleteDialogProps,
    },
  };
};
