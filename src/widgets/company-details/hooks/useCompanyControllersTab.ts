import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import {
  createControllerColumns,
  useDeleteController,
} from "@features/controllers";

import {
  type ControllerRow,
  useControllersQuery,
} from "@entities/controllers";

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
  const initialSearchState = useInitialSearchState(
    parseCompanyDetailsSearchState,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);
  const [serialNumber, setSerialNumber] = useState(
    initialSearchState.serialNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    initialSearchState.phoneNumber,
  );
  const [simIMSI, setSimIMSI] = useState(initialSearchState.simIMSI);

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
      tab: "controllers",
      page,
      limit,
      search,
      isArchived,
      serialNumber,
      phoneNumber,
      simIMSI,
    },
    createCompanyDetailsSearchString,
    isActive,
  );

  const handleCloseDeleteDialog = () => {
    setControllerToDelete(null);
  };

  const deleteControllerMutation = useDeleteController(handleCloseDeleteDialog);

  const {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useControllersQuery({
    companyId,
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    serialNumber,
    phoneNumber,
    simIMSI,
    enabled: isActive && Boolean(companyId),
  });

  const handleDeleteController = useCallback((controller: ControllerRow) => {
    setControllerToDelete(controller);
  }, []);

  const handleEditController = useCallback((controller: ControllerRow) => {
    setControllerToEdit(controller);
    setIsCreateDialogOpen(true);
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
    [t, handleDeleteController, handleEditController, handleTransferController],
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
    setControllerToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  }, []);

  const handleConfirmDelete = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
  };

  const handleCloseTransferDialog = () => {
    setControllerToTransfer(null);
  };

  const handleTransferSuccess = useCallback(() => {
    setControllerToTransfer(null);
    setPage(0);
  }, [setPage]);

  const handleOpenFiltersDialog = () => {
    setIsFiltersDialogOpen(true);
  };

  const handleCloseFiltersDialog = () => {
    setIsFiltersDialogOpen(false);
  };

  const handleApplyFilters = ({
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
    setIsFiltersDialogOpen(false);
  };

  const handleResetFilters = () => {
    setSerialNumber("");
    setPhoneNumber("");
    setSimIMSI("");
    setPage(0);
  };

  const hasActiveFilters = Boolean(
    serialNumber.trim() || phoneNumber.trim() || simIMSI.trim(),
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
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("controllers.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search,
      isSearchLoading: isFetching,
      isArchived,
      hasActiveFilters,
      onResetFilters: handleResetFilters,
      onOpenFiltersDialog: handleOpenFiltersDialog,
      onOpenCreateDialog: handleOpenCreateDialog,
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    dialogsProps: {
      t,
      companyId,
      isCreateDialogOpen,
      isFiltersDialogOpen,
      controllerToEdit,
      controllerToDelete,
      controllerToTransfer,
      serialNumber,
      phoneNumber,
      simIMSI,
      isDeletePending: deleteControllerMutation.isPending,
      onCloseCreateDialog: handleCloseCreateDialog,
      onCreateSuccess: handleCreateSuccess,
      onEditSuccess: handleEditSuccess,
      onCloseFiltersDialog: handleCloseFiltersDialog,
      onApplyFilters: handleApplyFilters,
      onCloseTransferDialog: handleCloseTransferDialog,
      onTransferSuccess: handleTransferSuccess,
      onCloseDeleteDialog: handleCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
    },
  };
};
