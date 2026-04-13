import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createUserColumns } from "@features/users";

import { type UserRow, useUsersQuery } from "@entities/users";

import { AUTH_ROLES, getUserDetailsRoute } from "@shared/constants";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";
import { useAuthStore } from "@shared/stores";
import type { Column } from "@shared/types";

import {
  createCompanyDetailsSearchString,
  parseCompanyDetailsSearchState,
} from "../helpers";
import { useCompanyUserDialogs } from "./useCompanyUserDialogs";

interface Params {
  companyId: string;
  isActive: boolean;
}

interface CompanyUsersTab {
  t: ReturnType<typeof useTranslation>["t"];
  tableSectionProps: {
    isLoading: boolean;
    isError: boolean;
    errorText: string;
    hasItems: boolean;
    emptyText: string;
    rows: UserRow[];
    columns: Column<UserRow>[];
    onRowClick: (user: UserRow) => void;
    pagination: {
      page: number;
      limit: number;
      total: number;
      onPageChange: (value: number) => void;
      onLimitChange: (value: number) => void;
      labelRowsPerPage: string;
    };
  };
  toolbarProps: {
    t: ReturnType<typeof useTranslation>["t"];
    search: string;
    isSearchLoading: boolean;
    isArchived: boolean;
    onOpenCreateDialog: () => void;
    onSearchChange: (value: string) => void;
    onArchivedChange: (value: boolean) => void;
  };
  dialogsProps: {
    t: ReturnType<typeof useTranslation>["t"];
    companyId: string;
    isCreateDialogOpen: boolean;
    userToEdit: UserRow | null;
    userToDelete: UserRow | null;
    isDeletePending: boolean;
    onCloseCreateDialog: () => void;
    onCreateSuccess: () => void;
    onEditSuccess: () => void;
    onCloseDeleteDialog: () => void;
    onConfirmDelete: () => void;
  };
}

export const useCompanyUsersTab = ({
  companyId,
  isActive,
}: Params): CompanyUsersTab => {
  const initialSearchState = useInitialSearchState(
    parseCompanyDetailsSearchState,
  );

  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const location = useLocation();

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
    {
      tab: "users",
      page,
      limit,
      search,
      isArchived,
      serialNumber: "",
      phoneNumber: "",
      simIMSI: "",
      locationType: "",
      meterStatus: "",
      accountNumber: "",
      clientName: "",
      address: "",
      isValveLockedByManager: "",
    },
    createCompanyDetailsSearchString,
    isActive,
  );

  const dialogs = useCompanyUserDialogs({
    setIsArchived,
    setPage,
  });

  const role = useAuthStore((state) => state.role);

  const {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useUsersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    companyId: role === AUTH_ROLES.ADMIN ? companyId : undefined,
    enabled: isActive && Boolean(companyId),
  });

  const handleUserRowClick = useCallback(
    (user: UserRow) => {
      navigate(getUserDetailsRoute(user.id), {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const userColumns = useMemo(
    () =>
      createUserColumns(t, dialogs.handleEditUser, dialogs.handleDeleteUser, {
        showCompanyColumn: false,
      }),
    [dialogs.handleDeleteUser, dialogs.handleEditUser, t],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("users.error"),
      hasItems: hasUsers,
      emptyText,
      rows: users,
      columns: userColumns,
      onRowClick: handleUserRowClick,
      pagination: {
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("users.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search,
      isSearchLoading: isFetching,
      isArchived,
      onOpenCreateDialog: dialogs.handleOpenCreateDialog,
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    dialogsProps: {
      t,
      companyId,
      isCreateDialogOpen: dialogs.isCreateDialogOpen,
      userToEdit: dialogs.userToEdit,
      userToDelete: dialogs.userToDelete,
      isDeletePending: dialogs.isDeletePending,
      onCloseCreateDialog: dialogs.handleCloseCreateDialog,
      onCreateSuccess: dialogs.handleCreateSuccess,
      onEditSuccess: dialogs.handleEditSuccess,
      onCloseDeleteDialog: dialogs.handleCloseDeleteDialog,
      onConfirmDelete: dialogs.handleConfirmDelete,
    },
  };
};
