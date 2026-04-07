import { Link } from "react-router";

import { useTranslation } from "react-i18next";

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

      <Box sx={{ display: activeTab === "users" ? "block" : "none" }}>
        <CompanyUsersTab companyId={companyId ?? ""} isActive={activeTab === "users"} />
      </Box>

      <Box sx={{ display: activeTab === "controllers" ? "block" : "none" }}>
        <CompanyControllersTab
          companyId={companyId ?? ""}
          isActive={activeTab === "controllers"}
        />
      </Box>
    </Box>
  );
};
