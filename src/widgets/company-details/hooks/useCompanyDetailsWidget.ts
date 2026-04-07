import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useRefreshCompanyToken } from "@features/companies";
import {
  createControllerColumns,
  useDeleteController,
} from "@features/controllers";
import {
  createUserColumns,
  useDeleteUser,
} from "@features/users";

import { useCompanyQuery } from "@entities/companies";
import {
  type ControllerRow,
  useControllersQuery,
} from "@entities/controllers";
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
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);
  const [isCreateControllerDialogOpen, setIsCreateControllerDialogOpen] =
    useState(false);
  const [isControllerFiltersDialogOpen, setIsControllerFiltersDialogOpen] =
    useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);

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

  const [serialNumber, setSerialNumber] = useState(
    initialSearchState.serialNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    initialSearchState.phoneNumber,
  );
  const [simIMSI, setSimIMSI] = useState(initialSearchState.simIMSI);

  useSyncSearchParams(
    {
      tab: activeTab,
      page,
      limit,
      search,
      isArchived,
      serialNumber,
      phoneNumber,
      simIMSI,
    },
    createCompanyDetailsSearchString,
  );

  const { company } = useCompanyQuery(companyId);

  const {
    users,
    total: usersTotal,
    hasUsers,
    emptyText: usersEmptyText,
    isLoading: isUsersLoading,
    isError: isUsersError,
    isFetching: isUsersFetching,
  } = useUsersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    companyId: normalizedCompanyId,
    enabled: activeTab === "users" && Boolean(normalizedCompanyId),
  });

  const {
    controllers,
    total: controllersTotal,
    hasControllers,
    emptyText: controllersEmptyText,
    isLoading: isControllersLoading,
    isError: isControllersError,
    isFetching: isControllersFetching,
  } = useControllersQuery({
    companyId: normalizedCompanyId,
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    serialNumber,
    phoneNumber,
    simIMSI,
    enabled: activeTab === "controllers" && Boolean(normalizedCompanyId),
  });

  const refreshCompanyTokenMutation = useRefreshCompanyToken(company?.id);

  const deleteUserMutation = useDeleteUser();

  const handleCloseDeleteControllerDialog = () => {
    setControllerToDelete(null);
  };

  const deleteControllerMutation = useDeleteController(
    handleCloseDeleteControllerDialog,
  );

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
    setPage(0);
  };

  // User Handlers
  const handleDeleteUser = useCallback((user: UserRow) => {
    setUserToDelete(user);
  }, []);

  const handleEditUser = useCallback((user: UserRow) => {
    setUserToEdit(user);
    setIsCreateUserDialogOpen(true);
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
    () => createUserColumns(t, handleEditUser, handleDeleteUser, { showCompanyColumn: false }),
    [t, handleEditUser, handleDeleteUser],
  );

  const handleOpenCreateUserDialog = () => {
    setUserToEdit(null);
    setIsCreateUserDialogOpen(true);
  };

  const handleCloseCreateUserDialog = () => {
    setIsCreateUserDialogOpen(false);
    setUserToEdit(null);
  };

  const handleCreateUserSuccess = useCallback(() => {
    setIsCreateUserDialogOpen(false);
    setUserToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditUserSuccess = useCallback(() => {
    setIsCreateUserDialogOpen(false);
    setUserToEdit(null);
  }, []);

  const handleConfirmDeleteUser = () => {
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

  const handleCloseDeleteUserDialog = () => {
    setUserToDelete(null);
  };

  const handleDeleteController = useCallback((controller: ControllerRow) => {
    setControllerToDelete(controller);
  }, []);

  const handleEditController = useCallback((controller: ControllerRow) => {
    setControllerToEdit(controller);
    setIsCreateControllerDialogOpen(true);
  }, []);

  const handleTransferController = useCallback((controller: ControllerRow) => {
    setControllerToTransfer(controller);
  }, []);

  const handleControllerRowClick = useCallback(
    (controller: ControllerRow) => {
      navigate(`/${ROUTES.CONTROLLERS}/${controller.id}`, {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const controllerColumns = useMemo(
    () =>
      createControllerColumns(
        t,
        handleEditController,
        handleTransferController,
        handleDeleteController,
        { showCompanyColumn: false },
      ),
    [t, handleEditController, handleTransferController, handleDeleteController],
  );

  const handleOpenCreateControllerDialog = () => {
    setControllerToEdit(null);
    setIsCreateControllerDialogOpen(true);
  };

  const handleCloseCreateControllerDialog = () => {
    setIsCreateControllerDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleCreateControllerSuccess = useCallback(() => {
    setIsCreateControllerDialogOpen(false);
    setControllerToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditControllerSuccess = useCallback(() => {
    setIsCreateControllerDialogOpen(false);
    setControllerToEdit(null);
  }, []);

  const handleConfirmDeleteController = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
  };

  const handleCloseTransferControllerDialog = () => {
    setControllerToTransfer(null);
  };

  const handleTransferControllerSuccess = useCallback(() => {
    setControllerToTransfer(null);
    setPage(0);
  }, [setPage]);

  const handleOpenControllerFiltersDialog = () => {
    setIsControllerFiltersDialogOpen(true);
  };

  const handleCloseControllerFiltersDialog = () => {
    setIsControllerFiltersDialogOpen(false);
  };

  const handleControllersApplyFilters = ({
    serialNumber: nextSerialNumber,
    phoneNumber: nextPhoneNumber,
    simIMSI: nextSimIMSI,
  }: {
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => {
    setSerialNumber(nextSerialNumber);
    setPhoneNumber(nextPhoneNumber);
    setSimIMSI(nextSimIMSI);
    setPage(0);
    setIsControllerFiltersDialogOpen(false);
  };

  const hasControllersActiveFilters = Boolean(
    serialNumber.trim() || phoneNumber.trim() || simIMSI.trim(),
  );

  const handleResetControllersFilters = () => {
    setSerialNumber("");
    setPhoneNumber("");
    setSimIMSI("");
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
    companyKey,
    activeTab,
    isCreateUserDialogOpen,
    userToEdit,
    userToDelete,
    isArchived,
    search,
    page,
    limit,
    users,
    usersTotal,
    hasUsers,
    usersEmptyText,
    isUsersLoading,
    isUsersError,
    isUsersFetching,
    userColumns,
    controllers,
    controllersTotal,
    hasControllers,
    controllersEmptyText,
    isControllersLoading,
    isControllersError,
    isControllersFetching,
    controllerColumns,
    isCreateControllerDialogOpen,
    isControllerFiltersDialogOpen,
    controllerToEdit,
    controllerToDelete,
    controllerToTransfer,
    serialNumber,
    phoneNumber,
    simIMSI,
    hasControllersActiveFilters,
    handleResetControllersFilters,
    handleCopyKey,
    handleRefreshKey,
    handleTabChange,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateUserDialog,
    handleCloseCreateUserDialog,
    handleCreateUserSuccess,
    handleEditUserSuccess,
    handleCloseDeleteUserDialog,
    handleConfirmDeleteUser,
    handleUserRowClick,
    deleteUserMutation,
    handleOpenCreateControllerDialog,
    handleCloseCreateControllerDialog,
    handleCreateControllerSuccess,
    handleEditControllerSuccess,
    handleCloseDeleteControllerDialog,
    handleConfirmDeleteController,
    handleControllerRowClick,
    deleteControllerMutation,
    handleOpenControllerFiltersDialog,
    handleCloseControllerFiltersDialog,
    handleControllersApplyFilters,
    handleCloseTransferControllerDialog,
    handleTransferControllerSuccess,
    isRefreshPending: refreshCompanyTokenMutation.isPending,
    setPage,
    setLimit,
  };
};
