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
  isCreateDialogOpen: boolean;
  userToEdit: UserRow | null;
  userToDelete: UserRow | null;
  isArchived: boolean;
  search: string;
  page: number;
  limit: number;
  users: UserRow[];
  total: number;
  hasUsers: boolean;
  emptyText: string;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  userColumns: Column<UserRow>[];
  handleSearchChange: (value: string) => void;
  handleArchivedChange: (value: boolean) => void;
  handleOpenCreateDialog: () => void;
  handleCloseCreateDialog: () => void;
  handleCreateSuccess: () => void;
  handleEditSuccess: () => void;
  handleCloseDeleteDialog: () => void;
  handleConfirmDelete: () => void;
  handleUserRowClick: (user: UserRow) => void;
  deleteUserMutation: ReturnType<typeof useDeleteUser>;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
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
    isCreateDialogOpen,
    userToEdit,
    userToDelete,
    isArchived,
    search,
    page,
    limit,
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    userColumns,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleUserRowClick,
    deleteUserMutation,
    setPage,
    setLimit,
  };
};
