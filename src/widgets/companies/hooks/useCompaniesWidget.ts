import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createCompanyColumns } from "@features/companies";

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

import { useCompanyDialogs } from "./useCompanyDialogs";

export const useCompaniesWidget = () => {
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

  const { dialogProps, toolbarProps, handleEditCompany, setCompanyToDelete } =
    useCompanyDialogs({
      setIsArchived,
      setPage,
    });

  const columns = useMemo(
    () => createCompanyColumns(t, handleEditCompany, setCompanyToDelete),
    [t, handleEditCompany, setCompanyToDelete],
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
    (company: CompanyRow) => {
      navigate(`/${ROUTES.COMPANIES}/${company.id}`);
    },
    [navigate],
  );

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("companies.error"),
      hasItems: hasCompanies,
      emptyText,
      rows: companies,
      columns,
      onRowClick: handleRowClick,
      pagination: {
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("companies.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search,
      isSearchLoading: isFetching,
      isArchived,
      onOpenCreateDialog: toolbarProps.onOpenCreateDialog,
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    dialogProps: {
      t,
      ...dialogProps,
    },
  };
};
