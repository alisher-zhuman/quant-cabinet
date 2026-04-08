import { Link } from "react-router";

import { useTranslation } from "react-i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { CreateCompanyDialog } from "@features/companies";

import { ROUTES } from "@shared/constants";
import { ConfirmDialog } from "@shared/ui/confirm-dialog";

import { useCompanyDetailsWidget } from "../../hooks/useCompanyDetailsWidget";
import type { CompanyDetailsTab } from "../../types";
import { CompanyControllersTab } from "../company-controllers-tab";
import { CompanyInfoSection } from "../company-info-section";
import { CompanyKeySection } from "../company-key-section";
import { CompanyMetersTab } from "../company-meters-tab";
import { CompanyUsersTab } from "../company-users-tab";

export const CompanyDetailsWidget = () => {
  const { t } = useTranslation();
  
  const {
    companyId,
    company,
    companyKey,
    activeTab,
    handleCopyKey,
    handleRefreshKey,
    handleTabChange,
    isRefreshPending,
    isEditDialogOpen,
    isDeleteDialogOpen,
    isDeletePending,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditSuccess,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 1.5,
          flexDirection: { xs: "column", sm: "row" },
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

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={handleOpenEditDialog}
          >
            {t("companies.actions.edit")}
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={handleOpenDeleteDialog}
          >
            {t("companies.actions.delete")}
          </Button>
        </Box>
      </Box>

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
        <Tab value="meters" label={t("meters.title")} />
      </Tabs>

      <Box sx={{ display: activeTab === "users" ? "block" : "none" }}>
        <CompanyUsersTab companyId={companyId ?? ""} isActive={activeTab === "users"} />
      </Box>

      <Box sx={{ display: activeTab === "controllers" ? "block" : "none" }}>
        <CompanyControllersTab
          companyId={companyId ?? ""}
          isActive={activeTab === "controllers"}
        />
      </Box>

      <Box sx={{ display: activeTab === "meters" ? "block" : "none" }}>
        <CompanyMetersTab
          companyId={companyId ?? ""}
          isActive={activeTab === "meters"}
        />
      </Box>

      {isEditDialogOpen && (
        <CreateCompanyDialog
          company={company}
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSuccess={handleEditSuccess}
        />
      )}

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title={t("companies.deleteDialog.title")}
        description={t("companies.deleteDialog.description")}
        cancelLabel={t("companies.deleteDialog.cancel")}
        confirmLabel={t("companies.deleteDialog.confirm")}
        isLoading={isDeletePending}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};
