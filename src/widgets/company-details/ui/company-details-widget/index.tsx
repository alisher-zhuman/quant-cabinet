import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { ROUTES } from "@shared/constants";

import { useCompanyDetailsWidget } from "../../hooks/useCompanyDetailsWidget";
import type { CompanyDetailsTab } from "../../types";
import { CompanyControllersTab } from "../company-controllers-tab";
import { CompanyInfoSection } from "../company-info-section";
import { CompanyKeySection } from "../company-key-section";
import { CompanyUsersTab } from "../company-users-tab";

export const CompanyDetailsWidget = () => {
  const {
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
    isRefreshPending,
    setPage,
    setLimit,
  } = useCompanyDetailsWidget();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        width: "100%",
        maxWidth: "none",
      }}
    >
      <Button
        component={Link}
        to={`/${ROUTES.COMPANIES}`}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
      >
        {t("companies.details.back")}
      </Button>

      <CompanyInfoSection t={t} company={company} companyId={companyId ?? ""} />

      <CompanyKeySection
        t={t}
        company={company}
        companyKey={companyKey}
        isRefreshPending={isRefreshPending}
        onRefresh={handleRefreshKey}
        onCopy={handleCopyKey}
      />

      <Tabs
        value={activeTab}
        onChange={(_, nextValue: string) =>
          handleTabChange(nextValue as CompanyDetailsTab)
        }
        variant="scrollable"
        allowScrollButtonsMobile
      >
        <Tab value="users" label={t("users.title")} />
        <Tab value="controllers" label={t("controllers.title")} />
      </Tabs>

      {activeTab === "users" && (
        <CompanyUsersTab
          companyId={companyId ?? ""}
          t={t}
          isCreateDialogOpen={isCreateUserDialogOpen}
          userToEdit={userToEdit}
          userToDelete={userToDelete}
          isArchived={isArchived}
          search={search}
          page={page}
          limit={limit}
          users={users}
          total={usersTotal}
          hasUsers={hasUsers}
          emptyText={usersEmptyText}
          isUsersLoading={isUsersLoading}
          isUsersError={isUsersError}
          isUsersFetching={isUsersFetching}
          userColumns={userColumns}
          handleSearchChange={handleSearchChange}
          handleArchivedChange={handleArchivedChange}
          handleOpenCreateDialog={handleOpenCreateUserDialog}
          handleCloseCreateDialog={handleCloseCreateUserDialog}
          handleCreateSuccess={handleCreateUserSuccess}
          handleEditSuccess={handleEditUserSuccess}
          handleCloseDeleteDialog={handleCloseDeleteUserDialog}
          handleConfirmDelete={handleConfirmDeleteUser}
          handleUserRowClick={handleUserRowClick}
          deleteUserMutationIsPending={deleteUserMutation.isPending}
          setPage={setPage}
          setLimit={setLimit}
        />
      )}

      {activeTab === "controllers" && (
        <CompanyControllersTab
          companyId={companyId ?? ""}
          t={t}
          isCreateDialogOpen={isCreateControllerDialogOpen}
          isFiltersDialogOpen={isControllerFiltersDialogOpen}
          controllerToEdit={controllerToEdit}
          controllerToDelete={controllerToDelete}
          controllerToTransfer={controllerToTransfer}
          isArchived={isArchived}
          search={search}
          page={page}
          limit={limit}
          controllers={controllers}
          total={controllersTotal}
          hasControllers={hasControllers}
          emptyText={controllersEmptyText}
          isControllersLoading={isControllersLoading}
          isControllersError={isControllersError}
          isControllersFetching={isControllersFetching}
          controllerColumns={controllerColumns}
          serialNumber={serialNumber}
          phoneNumber={phoneNumber}
          simIMSI={simIMSI}
          hasActiveFilters={hasControllersActiveFilters}
          handleResetFilters={handleResetControllersFilters}
          handleSearchChange={handleSearchChange}
          handleArchivedChange={handleArchivedChange}
          handleOpenCreateDialog={handleOpenCreateControllerDialog}
          handleCloseCreateDialog={handleCloseCreateControllerDialog}
          handleCreateSuccess={handleCreateControllerSuccess}
          handleEditSuccess={handleEditControllerSuccess}
          handleOpenFiltersDialog={handleOpenControllerFiltersDialog}
          handleCloseFiltersDialog={handleCloseControllerFiltersDialog}
          handleApplyFilters={handleControllersApplyFilters}
          handleCloseDeleteDialog={handleCloseDeleteControllerDialog}
          handleConfirmDelete={handleConfirmDeleteController}
          handleCloseTransferDialog={handleCloseTransferControllerDialog}
          handleTransferSuccess={handleTransferControllerSuccess}
          handleControllerRowClick={handleControllerRowClick}
          deleteControllerMutationIsPending={deleteControllerMutation.isPending}
          setPage={setPage}
          setLimit={setLimit}
        />
      )}
    </Box>
  );
};
