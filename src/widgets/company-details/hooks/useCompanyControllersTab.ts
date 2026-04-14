import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createControllerColumns } from "@features/controllers";

import {
  type ControllerRow,
  useControllersQuery,
} from "@entities/controllers";

import { getControllerDetailsRoute } from "@shared/constants";
import { isAdmin } from "@shared/helpers";
import { useAuthStore } from "@shared/stores";
import type { Column } from "@shared/types";

import { useCompanyControllerDialogs } from "./useCompanyControllerDialogs";
import { useCompanyControllerFiltersState } from "./useCompanyControllerFiltersState";

interface Params {
  companyId: string;
  isActive: boolean;
}

interface CompanyControllersTab {
  t: ReturnType<typeof useTranslation>["t"];
  tableSectionProps: {
    isLoading: boolean;
    isError: boolean;
    errorText: string;
    hasItems: boolean;
    emptyText: string;
    rows: ControllerRow[];
    columns: Column<ControllerRow>[];
    onRowClick: (controller: ControllerRow) => void;
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
    hasActiveFilters: boolean;
    onResetFilters: () => void;
    onOpenFiltersDialog: () => void;
    onOpenCreateDialog: () => void;
    onSearchChange: (value: string) => void;
    onArchivedChange: (value: boolean) => void;
  };
  dialogsProps: {
    t: ReturnType<typeof useTranslation>["t"];
    companyId: string;
    isCreateDialogOpen: boolean;
    isFiltersDialogOpen: boolean;
    controllerToEdit: ControllerRow | null;
    controllerToDelete: ControllerRow | null;
    controllerToTransfer: ControllerRow | null;
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
    isDeletePending: boolean;
    onCloseCreateDialog: () => void;
    onCreateSuccess: () => void;
    onEditSuccess: () => void;
    onCloseFiltersDialog: () => void;
    onApplyFilters: (filters: {
      serialNumber: string;
      phoneNumber: string;
      simIMSI: string;
    }) => void;
    onCloseTransferDialog: () => void;
    onTransferSuccess: () => void;
    onCloseDeleteDialog: () => void;
    onConfirmDelete: () => void;
  };
}

export const useCompanyControllersTab = ({
  companyId,
  isActive,
}: Params): CompanyControllersTab => {
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const location = useLocation();

  const role = useAuthStore((state) => state.role);

  const filtersState = useCompanyControllerFiltersState({ isActive });
  
  const dialogs = useCompanyControllerDialogs({
    setIsArchived: filtersState.setIsArchived,
    setPage: filtersState.setPage,
  });

  const {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useControllersQuery({
    companyId: isAdmin(role) ? companyId : undefined,
    page: filtersState.page,
    limit: filtersState.limit,
    search: filtersState.debouncedSearch,
    isArchived: filtersState.isArchived,
    serialNumber: filtersState.serialNumber,
    phoneNumber: filtersState.phoneNumber,
    simIMSI: filtersState.simIMSI,
    enabled: isActive && Boolean(companyId),
  });

  const handleControllerRowClick = useCallback(
    (controller: ControllerRow) => {
      navigate(getControllerDetailsRoute(controller.id), {
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
        dialogs.handleEditController,
        dialogs.handleTransferController,
        dialogs.handleDeleteController,
        { showCompanyColumn: false },
      ),
    [
      dialogs.handleDeleteController,
      dialogs.handleEditController,
      dialogs.handleTransferController,
      t,
    ],
  );

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("controllers.error"),
      hasItems: hasControllers,
      emptyText,
      rows: controllers,
      columns: controllerColumns,
      onRowClick: handleControllerRowClick,
      pagination: {
        page: filtersState.page,
        limit: filtersState.limit,
        total,
        onPageChange: filtersState.setPage,
        onLimitChange: filtersState.setLimit,
        labelRowsPerPage: t("controllers.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search: filtersState.search,
      isSearchLoading: isFetching,
      isArchived: filtersState.isArchived,
      hasActiveFilters: filtersState.hasActiveFilters,
      onResetFilters: filtersState.handleResetFilters,
      onOpenFiltersDialog: filtersState.handleOpenFiltersDialog,
      onOpenCreateDialog: dialogs.handleOpenCreateDialog,
      onSearchChange: filtersState.handleSearchChange,
      onArchivedChange: filtersState.handleArchivedChange,
    },
    dialogsProps: {
      t,
      companyId,
      isCreateDialogOpen: dialogs.isCreateDialogOpen,
      isFiltersDialogOpen: filtersState.isFiltersDialogOpen,
      controllerToEdit: dialogs.controllerToEdit,
      controllerToDelete: dialogs.controllerToDelete,
      controllerToTransfer: dialogs.controllerToTransfer,
      serialNumber: filtersState.serialNumber,
      phoneNumber: filtersState.phoneNumber,
      simIMSI: filtersState.simIMSI,
      isDeletePending: dialogs.isDeletePending,
      onCloseCreateDialog: dialogs.handleCloseCreateDialog,
      onCreateSuccess: dialogs.handleCreateSuccess,
      onEditSuccess: dialogs.handleEditSuccess,
      onCloseFiltersDialog: filtersState.handleCloseFiltersDialog,
      onApplyFilters: filtersState.handleApplyFilters,
      onCloseTransferDialog: dialogs.handleCloseTransferDialog,
      onTransferSuccess: dialogs.handleTransferSuccess,
      onCloseDeleteDialog: dialogs.handleCloseDeleteDialog,
      onConfirmDelete: dialogs.handleConfirmDelete,
    },
  };
};
