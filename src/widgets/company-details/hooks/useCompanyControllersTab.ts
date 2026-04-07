import { useCallback, useMemo, useState } from "react";

import type { TFunction } from "i18next";

import {
  createControllerColumns,
  useDeleteController,
} from "@features/controllers";

import {
  type ControllerRow,
  useControllersQuery,
} from "@entities/controllers";

import type { Column } from "@shared/types";

interface Params {
  t: TFunction;
  companyId: string;
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
  enabled: boolean;
  initialSerialNumber: string;
  initialPhoneNumber: string;
  initialSimIMSI: string;
  backTo: string;
  navigateToController: (controllerId: string, backTo: string) => void;
  setIsArchived: (value: boolean) => void;
  setPage: (value: number) => void;
}

interface CompanyControllersTab {
  isCreateDialogOpen: boolean;
  isFiltersDialogOpen: boolean;
  controllerToEdit: ControllerRow | null;
  controllerToDelete: ControllerRow | null;
  controllerToTransfer: ControllerRow | null;
  controllers: ControllerRow[];
  total: number;
  hasControllers: boolean;
  emptyText: string;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  controllerColumns: Column<ControllerRow>[];
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
  hasActiveFilters: boolean;
  handleOpenCreateDialog: () => void;
  handleCloseCreateDialog: () => void;
  handleCreateSuccess: () => void;
  handleEditSuccess: () => void;
  handleCloseDeleteDialog: () => void;
  handleConfirmDelete: () => void;
  handleControllerRowClick: (controller: ControllerRow) => void;
  deleteControllerMutation: ReturnType<typeof useDeleteController>;
  handleOpenFiltersDialog: () => void;
  handleCloseFiltersDialog: () => void;
  handleApplyFilters: (filters: {
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => void;
  handleCloseTransferDialog: () => void;
  handleTransferSuccess: () => void;
  handleResetFilters: () => void;
}

export const useCompanyControllersTab = ({
  t,
  companyId,
  page,
  limit,
  search,
  isArchived,
  enabled,
  initialSerialNumber,
  initialPhoneNumber,
  initialSimIMSI,
  backTo,
  navigateToController,
  setIsArchived,
  setPage,
}: Params): CompanyControllersTab => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);
  const [serialNumber, setSerialNumber] = useState(initialSerialNumber);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [simIMSI, setSimIMSI] = useState(initialSimIMSI);

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
    search,
    isArchived,
    serialNumber,
    phoneNumber,
    simIMSI,
    enabled,
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
      navigateToController(controller.id, backTo);
    },
    [backTo, navigateToController],
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
    isCreateDialogOpen,
    isFiltersDialogOpen,
    controllerToEdit,
    controllerToDelete,
    controllerToTransfer,
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    controllerColumns,
    serialNumber,
    phoneNumber,
    simIMSI,
    hasActiveFilters,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleControllerRowClick,
    deleteControllerMutation,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
    handleApplyFilters,
    handleCloseTransferDialog,
    handleTransferSuccess,
    handleResetFilters,
  };
};
