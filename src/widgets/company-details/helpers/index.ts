import {
  COMPANY_DETAILS_TABS,
  DEFAULT_COMPANY_DETAILS_TAB,
} from "../constants";
import type { CompanyDetailsTab } from "../types";

interface CompanyDetailsSearchState {
  tab: CompanyDetailsTab;
}

export const parseCompanyDetailsSearchState = (
  params: URLSearchParams,
): CompanyDetailsSearchState => {
  const tab = params.get("tab");

  return {
    tab: COMPANY_DETAILS_TABS.includes(tab as CompanyDetailsTab)
      ? (tab as CompanyDetailsTab)
      : DEFAULT_COMPANY_DETAILS_TAB,
  };
};

export const createCompanyDetailsSearchString = ({
  tab,
}: CompanyDetailsSearchState) => {
  const params = new URLSearchParams();

  if (tab !== DEFAULT_COMPANY_DETAILS_TAB) {
    params.set("tab", tab);
  }

  return params.toString();
};
