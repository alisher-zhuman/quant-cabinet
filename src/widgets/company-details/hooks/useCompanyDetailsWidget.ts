import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useCompanyQuery } from "@entities/companies";

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
import { useCompanyControllersTab } from "./useCompanyControllersTab";
import { useCompanyKeyActions } from "./useCompanyKeyActions";
import { useCompanyUsersTab } from "./useCompanyUsersTab";

export const useCompanyDetailsWidget = () => {
  const initialSearchState = useInitialSearchState(
    parseCompanyDetailsSearchState,
  );

  const [activeTab, setActiveTab] = useState<CompanyDetailsTab>(
    initialSearchState.tab,
  );

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

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

  const backTo = `${location.pathname}${location.search}`;

  const navigateToUser = (userId: string, nextBackTo: string) => {
    navigate(`/${ROUTES.USERS}/${userId}`, {
      state: {
        backTo: nextBackTo,
      },
    });
  };

  const navigateToController = (controllerId: string, nextBackTo: string) => {
    navigate(`/${ROUTES.CONTROLLERS}/${controllerId}`, {
      state: {
        backTo: nextBackTo,
      },
    });
  };

  const { company } = useCompanyQuery(companyId);

  const companyKeyActions = useCompanyKeyActions({ company, t });

  const usersTab = useCompanyUsersTab({
    t,
    companyId: normalizedCompanyId,
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    enabled: activeTab === "users" && Boolean(normalizedCompanyId),
    backTo,
    navigateToUser,
    setIsArchived,
    setPage,
  });

  const controllersTab = useCompanyControllersTab({
    t,
    companyId: normalizedCompanyId,
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    enabled: activeTab === "controllers" && Boolean(normalizedCompanyId),
    initialSerialNumber: initialSearchState.serialNumber,
    initialPhoneNumber: initialSearchState.phoneNumber,
    initialSimIMSI: initialSearchState.simIMSI,
    backTo,
    navigateToController,
    setIsArchived,
    setPage,
  });

  useSyncSearchParams(
    {
      tab: activeTab,
      page,
      limit,
      search,
      isArchived,
      serialNumber: controllersTab.serialNumber,
      phoneNumber: controllersTab.phoneNumber,
      simIMSI: controllersTab.simIMSI,
    },
    createCompanyDetailsSearchString,
  );

  const handleTabChange = (tab: CompanyDetailsTab) => {
    setActiveTab(tab);
    setPage(0);
  };

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
    companyId,
    company,
    companyKey: companyKeyActions.companyKey,
    activeTab,
    isArchived,
    search,
    page,
    limit,
    isCreateUserDialogOpen: usersTab.isCreateDialogOpen,
    userToEdit: usersTab.userToEdit,
    userToDelete: usersTab.userToDelete,
    users: usersTab.users,
    usersTotal: usersTab.total,
    hasUsers: usersTab.hasUsers,
    usersEmptyText: usersTab.emptyText,
    isUsersLoading: usersTab.isLoading,
    isUsersError: usersTab.isError,
    isUsersFetching: usersTab.isFetching,
    userColumns: usersTab.userColumns,
    controllers: controllersTab.controllers,
    controllersTotal: controllersTab.total,
    hasControllers: controllersTab.hasControllers,
    controllersEmptyText: controllersTab.emptyText,
    isControllersLoading: controllersTab.isLoading,
    isControllersError: controllersTab.isError,
    isControllersFetching: controllersTab.isFetching,
    controllerColumns: controllersTab.controllerColumns,
    isCreateControllerDialogOpen: controllersTab.isCreateDialogOpen,
    isControllerFiltersDialogOpen: controllersTab.isFiltersDialogOpen,
    controllerToEdit: controllersTab.controllerToEdit,
    controllerToDelete: controllersTab.controllerToDelete,
    controllerToTransfer: controllersTab.controllerToTransfer,
    serialNumber: controllersTab.serialNumber,
    phoneNumber: controllersTab.phoneNumber,
    simIMSI: controllersTab.simIMSI,
    hasControllersActiveFilters: controllersTab.hasActiveFilters,
    handleResetControllersFilters: controllersTab.handleResetFilters,
    handleCopyKey: companyKeyActions.handleCopyKey,
    handleRefreshKey: companyKeyActions.handleRefreshKey,
    handleTabChange,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateUserDialog: usersTab.handleOpenCreateDialog,
    handleCloseCreateUserDialog: usersTab.handleCloseCreateDialog,
    handleCreateUserSuccess: usersTab.handleCreateSuccess,
    handleEditUserSuccess: usersTab.handleEditSuccess,
    handleCloseDeleteUserDialog: usersTab.handleCloseDeleteDialog,
    handleConfirmDeleteUser: usersTab.handleConfirmDelete,
    handleUserRowClick: usersTab.handleUserRowClick,
    deleteUserMutation: usersTab.deleteUserMutation,
    handleOpenCreateControllerDialog: controllersTab.handleOpenCreateDialog,
    handleCloseCreateControllerDialog: controllersTab.handleCloseCreateDialog,
    handleCreateControllerSuccess: controllersTab.handleCreateSuccess,
    handleEditControllerSuccess: controllersTab.handleEditSuccess,
    handleCloseDeleteControllerDialog: controllersTab.handleCloseDeleteDialog,
    handleConfirmDeleteController: controllersTab.handleConfirmDelete,
    handleControllerRowClick: controllersTab.handleControllerRowClick,
    deleteControllerMutation: controllersTab.deleteControllerMutation,
    handleOpenControllerFiltersDialog: controllersTab.handleOpenFiltersDialog,
    handleCloseControllerFiltersDialog:
      controllersTab.handleCloseFiltersDialog,
    handleControllersApplyFilters: controllersTab.handleApplyFilters,
    handleCloseTransferControllerDialog:
      controllersTab.handleCloseTransferDialog,
    handleTransferControllerSuccess: controllersTab.handleTransferSuccess,
    isRefreshPending: companyKeyActions.isRefreshPending,
    setPage,
    setLimit,
  };
};
