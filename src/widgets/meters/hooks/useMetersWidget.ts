import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns, useDeleteMeter } from "@features/meters";

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

export const useMetersWidget = () => {
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);
  
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

  const handleRowClick = useCallback(
    (meter: MeterRow) => {
      navigate(`/${ROUTES.METERS}/${meter.id}`);
    },
    [navigate],
  );

  return {
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
    handleRowClick,
    onCloseDeleteDialog,
    setPage,
    setLimit,
  };
};
