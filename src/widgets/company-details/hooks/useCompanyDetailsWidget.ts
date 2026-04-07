import { useState } from "react";
import { useParams,useSearchParams } from "react-router";

import { useTranslation } from "react-i18next";

import { useCompanyQuery } from "@entities/companies";

import type { CompanyDetailsTab } from "../types";
import { useCompanyKeyActions } from "./useCompanyKeyActions";

export const useCompanyDetailsWidget = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { companyId } = useParams();

  const [activeTab, setActiveTab] = useState<CompanyDetailsTab>(() => {
    const tab = searchParams.get("tab");

    return tab === "controllers" ? "controllers" : "users";
  });

  const { company } = useCompanyQuery(companyId);

  const companyKeyActions = useCompanyKeyActions({ company, t });

  return {
    t,
    companyId,
    company,
    companyKey: companyKeyActions.companyKey,
    activeTab,
    handleCopyKey: companyKeyActions.handleCopyKey,
    handleRefreshKey: companyKeyActions.handleRefreshKey,
    handleTabChange: setActiveTab,
    isRefreshPending: companyKeyActions.isRefreshPending,
  };
};
