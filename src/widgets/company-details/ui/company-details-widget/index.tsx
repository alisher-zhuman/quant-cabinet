import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { ROUTES } from "@shared/constants";
import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

import { useCompanyDetailsWidget } from "../../hooks/useCompanyDetailsWidget";
import type { CompanyDetailsTab } from "../../types";
import { CompanyControllersTab } from "../company-controllers-tab";
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

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="h4" fontWeight={700}>
              {company?.name ?? "-"}
            </Typography>

            <Typography color="text.secondary">
              ID: {company?.id ?? companyId ?? "-"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.25,
            }}
          >
            <DetailRow
              label={t("companies.details.fields.name")}
              value={company?.name ?? "-"}
            />
            <DetailRow
              label={t("companies.details.fields.isArchived")}
              value={
                company
                  ? t(
                      company.isArchived
                        ? "companies.details.values.archived"
                        : "companies.details.values.active",
                    )
                  : "-"
              }
            />
            <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
              <DetailRow
                label={t("companies.details.fields.address")}
                value={company?.address ?? "-"}
              />
            </Box>
            <DetailRow
              label={t("companies.details.fields.createdAt")}
              value={company?.createdAt ? formatDate(company.createdAt) : "-"}
            />
            <DetailRow
              label={t("companies.details.fields.updatedAt")}
              value={company?.updatedAt ? formatDate(company.updatedAt) : "-"}
            />
            <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
              <DetailRow
                label={t("companies.details.fields.id")}
                value={company?.id ?? companyId ?? "-"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "background.default",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-all",
                  lineHeight: 1.65,
                }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: "text.secondary" }}
                >
                  {t("companies.details.fields.key")}:
                </Box>{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily:
                      '"SFMono-Regular", "SFMono-Regular", Consolas, monospace',
                  }}
                >
                  {companyKey || "-"}
                </Box>
              </Typography>

              {company?.key && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      lg: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.25,
                    mt: 1.25,
                  }}
                >
                  <DetailRow
                    label={t("companies.details.fields.keyCreatedAt")}
                    value={formatDate(company.key.createdAt)}
                  />
                  <DetailRow
                    label={t("companies.details.fields.keyUpdatedAt")}
                    value={formatDate(company.key.updatedAt)}
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                aria-label={t("companies.details.actions.refresh")}
                color="primary"
                disabled={isRefreshPending || !company?.id}
                onClick={handleRefreshKey}
                sx={{ backgroundColor: "background.paper" }}
              >
                <RefreshRoundedIcon />
              </IconButton>

              {companyKey && (
                <IconButton
                  aria-label={t("companies.details.actions.copy")}
                  color="primary"
                  onClick={handleCopyKey}
                  sx={{ backgroundColor: "background.paper" }}
                >
                  <ContentCopyRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

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
