import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useRefreshCompanyToken } from "@features/companies";
import {
  createUserColumns,
  getUsersNameSearchParams,
  useDeleteUser,
} from "@features/users";

import { useCompanyQuery } from "@entities/companies";
import { type UserRow, useUsersQuery } from "@entities/users";

import { ROUTES } from "@shared/constants";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

import {
  createCompanyDetailsSearchString,
  parseCompanyDetailsSearchState,
} from "../helpers";
import type { CompanyDetailsTab } from "../types";

export const useCompanyDetailsWidget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);

  const initialSearchState = useInitialSearchState(
    parseCompanyDetailsSearchState,
  );

  const [activeTab, setActiveTab] = useState<CompanyDetailsTab>(
    initialSearchState.tab,
  );

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { companyId } = useParams();

  const normalizedCompanyId = companyId ?? "";

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
    { tab: activeTab, page, limit, search, isArchived },
    createCompanyDetailsSearchString,
  );

  const { firstName, lastName } = getUsersNameSearchParams(debouncedSearch);

  const deleteUserMutation = useDeleteUser();

  const { company } = useCompanyQuery(companyId);

  const {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading: isUsersLoading,
    isError: isUsersError,
    isFetching: isUsersFetching,
  } = useUsersQuery({
    page,
    limit,
    firstName,
    lastName,
    isArchived,
    companyId: normalizedCompanyId,
    enabled: activeTab === "users" && Boolean(normalizedCompanyId),
  });

  const refreshCompanyTokenMutation = useRefreshCompanyToken(company?.id);

  const companyKey = company?.key?.key ?? "";

  const handleCopyKey = async () => {
    if (!companyKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(companyKey);
      toast.success(t("companies.details.toast.copySuccess"));
    } catch {
      toast.error(t("companies.details.toast.copyError"));
    }
  };

  const handleRefreshKey = () => {
    if (!company?.id) {
      return;
    }

    refreshCompanyTokenMutation.mutate({ companyId: company.id });
  };

  const handleTabChange = (tab: CompanyDetailsTab) => {
    setActiveTab(tab);
  };

  const handleDeleteUser = useCallback(
    (user: UserRow) => {
      deleteUserMutation.mutate({ userId: user.id });
    },
    [deleteUserMutation],
  );

  const handleEditUser = useCallback((user: UserRow) => {
    setUserToEdit(user);
    setIsCreateDialogOpen(true);
  }, []);

  const handleUserRowClick = useCallback(
    (user: UserRow) => {
      navigate(`/${ROUTES.USERS}/${encodeURIComponent(user.email)}`);
    },
    [navigate],
  );

  const userColumns = useMemo(
    () => createUserColumns(t, handleEditUser, handleDeleteUser),
    [t, handleEditUser, handleDeleteUser],
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

  return {
    t,
    companyId,
    company,
    companyKey,
    activeTab,
    isCreateDialogOpen,
    userToEdit,
    isArchived,
    search,
    page,
    limit,
    users,
    total,
    hasUsers,
    emptyText,
    isUsersLoading,
    isUsersError,
    isUsersFetching,
    userColumns,
    handleCopyKey,
    handleRefreshKey,
    handleTabChange,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleUserRowClick,
    isRefreshPending: refreshCompanyTokenMutation.isPending,
    setPage,
    setLimit,
  };
};
