import { useCallback } from "react";

import type { TFunction } from "i18next";
import toast from "react-hot-toast";

import { useRefreshCompanyToken } from "@features/companies";

import type { CompanyDetails } from "@entities/companies";

interface Params {
  company: CompanyDetails | null;
  t: TFunction;
}

interface CompanyKeyActions {
  companyKey: string;
  handleCopyKey: () => Promise<void>;
  handleRefreshKey: () => void;
  isRefreshPending: boolean;
}

export const useCompanyKeyActions = ({
  company,
  t,
}: Params): CompanyKeyActions => {
  const companyId = company?.id;
  const refreshCompanyTokenMutation = useRefreshCompanyToken(companyId);

  const companyKey = company?.key?.key ?? "";

  const handleCopyKey = useCallback(async () => {
    if (!companyKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(companyKey);
      toast.success(t("companies.details.toast.copySuccess"));
    } catch {
      toast.error(t("companies.details.toast.copyError"));
    }
  }, [companyKey, t]);

  const handleRefreshKey = useCallback(() => {
    if (!companyId) {
      return;
    }

    refreshCompanyTokenMutation.mutate({ companyId });
  }, [companyId, refreshCompanyTokenMutation]);

  return {
    companyKey,
    handleCopyKey,
    handleRefreshKey,
    isRefreshPending: refreshCompanyTokenMutation.isPending,
  };
};
