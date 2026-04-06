import { createUsersSearchString, parseUsersSearchState } from "@features/users";

import {
  COMPANY_DETAILS_TABS,
  DEFAULT_COMPANY_DETAILS_TAB,
} from "../constants";
import type { CompanyDetailsSearchState, CompanyDetailsTab } from "../types";

export const parseCompanyDetailsSearchState = (
  params: URLSearchParams,
): CompanyDetailsSearchState => {
  const tab = params.get("tab");

  return {
    ...parseUsersSearchState(params),
    tab: COMPANY_DETAILS_TABS.includes(tab as CompanyDetailsTab)
      ? (tab as CompanyDetailsTab)
      : DEFAULT_COMPANY_DETAILS_TAB,
  };
};

export const createCompanyDetailsSearchString = ({
  tab,
  ...listState
}: CompanyDetailsSearchState) => {
  const params = new URLSearchParams(createUsersSearchString(listState));

  if (tab !== DEFAULT_COMPANY_DETAILS_TAB) {
    params.set("tab", tab);
  }

  return params.toString();
};
