import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  createControllerColumns,
  createControllersSearchString,
  parseControllersSearchState,
  useDeleteController,
} from "@features/controllers";

import { type ControllerRow, useControllersQuery } from "@entities/controllers";

import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

export const useControllersWidget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [controllerToEdit, setControllerToEdit] =
    useState<ControllerRow | null>(null);
  const [controllerToTransfer, setControllerToTransfer] =
    useState<ControllerRow | null>(null);
  const [controllerToDelete, setControllerToDelete] =
    useState<ControllerRow | null>(null);

  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseControllersSearchState);

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

  const [companyId, setCompanyId] = useState(initialSearchState.companyId);
  const [serialNumber, setSerialNumber] = useState(
    initialSearchState.serialNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    initialSearchState.phoneNumber,
  );
  const [simIMSI, setSimIMSI] = useState(initialSearchState.simIMSI);

  useSyncSearchParams(
    {
      page,
      limit,
      search,
      isArchived,
      companyId,
      serialNumber,
      phoneNumber,
      simIMSI,
    },
    createControllersSearchString,
  );

  const {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useControllersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    companyId,
    serialNumber,
    phoneNumber,
    simIMSI,
  });

  const onCloseDeleteDialog = () => {
    setControllerToDelete(null);
  };

  const deleteControllerMutation = useDeleteController(onCloseDeleteDialog);

  const handleEditController = (controller: ControllerRow) => {
    setControllerToEdit(controller);
    setIsCreateDialogOpen(true);
  };

  const handleTransferController = (controller: ControllerRow) => {
    setControllerToTransfer(controller);
  };

  const columns = useMemo(
    () =>
      createControllerColumns(
        t,
        handleEditController,
        handleTransferController,
        setControllerToDelete,
      ),
    [t],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleOpenFiltersDialog = () => {
    setIsFiltersDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setControllerToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleCloseTransferDialog = () => {
    setControllerToTransfer(null);
  };

  const handleCloseFiltersDialog = () => {
    setIsFiltersDialogOpen(false);
  };

  const handleApplyFilters = ({
    companyId: nextCompanyId,
    serialNumber: nextSerialNumber,
    phoneNumber: nextPhoneNumber,
    simIMSI: nextSimIMSI,
  }: {
    companyId: string;
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => {
    setCompanyId(nextCompanyId);
    setSerialNumber(nextSerialNumber);
    setPhoneNumber(nextPhoneNumber);
    setSimIMSI(nextSimIMSI);
    setPage(0);
    setIsFiltersDialogOpen(false);
  };

  const hasActiveFilters = Boolean(
    companyId.trim() ||
    serialNumber.trim() ||
    phoneNumber.trim() ||
    simIMSI.trim(),
  );

  const handleConfirmDelete = () => {
    if (!controllerToDelete) {
      return;
    }

    deleteControllerMutation.mutate({ id: controllerToDelete.id });
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
    setIsArchived(false);
    setPage(0);
  };

  const handleEditSuccess = () => {
    setIsCreateDialogOpen(false);
    setControllerToEdit(null);
  };

  const handleTransferSuccess = () => {
    setControllerToTransfer(null);
    setPage(0);
  };

  return {
    t,
    isCreateDialogOpen,
    isFiltersDialogOpen,
    controllerToEdit,
    controllerToTransfer,
    controllerToDelete,
    isArchived,
    search,
    page,
    limit,
    companyId,
    serialNumber,
    phoneNumber,
    simIMSI,
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    columns,
    hasActiveFilters,
    deleteControllerMutation,
    handleSearchChange,
    handleArchivedChange,
    handleOpenFiltersDialog,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCloseTransferDialog,
    handleCloseFiltersDialog,
    handleApplyFilters,
    handleConfirmDelete,
    handleCreateSuccess,
    handleEditSuccess,
    handleTransferSuccess,
    onCloseDeleteDialog,
    setPage,
    setLimit,
  };
};
