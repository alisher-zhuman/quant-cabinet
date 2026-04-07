import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createUserColumns, useDeleteUser } from "@features/users";

import { type UserRow, useUsersQuery } from "@entities/users";

import { ROUTES } from "@shared/constants";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";
import type { Column } from "@shared/types";

import {
  createCompanyDetailsSearchString,
  parseCompanyDetailsSearchState,
} from "../helpers";

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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);

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
    },
    createCompanyDetailsSearchString,
    isActive,
  );

  const deleteUserMutation = useDeleteUser();

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
    companyId,
    enabled: isActive && Boolean(companyId),
  });

  const handleDeleteUser = useCallback((user: UserRow) => {
    setUserToDelete(user);
  }, []);

  const handleEditUser = useCallback((user: UserRow) => {
    setUserToEdit(user);
    setIsCreateDialogOpen(true);
  }, []);

  const handleUserRowClick = useCallback(
    (user: UserRow) => {
      navigate(`/${ROUTES.USERS}/${user.id}`, {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const userColumns = useMemo(
    () =>
      createUserColumns(t, handleEditUser, handleDeleteUser, {
        showCompanyColumn: false,
      }),
    [t, handleDeleteUser, handleEditUser],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleOpenCreateDialog = () => {
    setUserToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
  }, []);

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) {
      return;
    }

    deleteUserMutation.mutate(
      { userId: userToDelete.id },
      {
        onSuccess: () => {
          setUserToDelete(null);
        },
      },
    );
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
      onOpenCreateDialog: handleOpenCreateDialog,
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    dialogsProps: {
      t,
      companyId,
      isCreateDialogOpen,
      userToEdit,
      userToDelete,
      isDeletePending: deleteUserMutation.isPending,
      onCloseCreateDialog: handleCloseCreateDialog,
      onCreateSuccess: handleCreateSuccess,
      onEditSuccess: handleEditSuccess,
      onCloseDeleteDialog: handleCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
    },
  };
};
