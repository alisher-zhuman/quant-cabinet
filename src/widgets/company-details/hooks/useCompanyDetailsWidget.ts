import { useParams } from "react-router";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useRefreshCompanyToken } from "@features/companies";

import { useCompanyQuery } from "@entities/companies";

export const useCompanyDetailsWidget = () => {
  const { t } = useTranslation();

  const { companyId } = useParams();

  const { company } = useCompanyQuery(companyId);

  const refreshCompanyTokenMutation = useRefreshCompanyToken(company?.id);

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

  return {
    t,
    companyId,
    company,
    companyKey,
    handleCopyKey,
    handleRefreshKey,
    isRefreshPending: refreshCompanyTokenMutation.isPending,
  };
};
