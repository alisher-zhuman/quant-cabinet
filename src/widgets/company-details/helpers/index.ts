import {
  createControllersSearchString,
  parseControllersSearchState,
} from "@features/controllers";

import { createListSearchString, parseListSearchState } from "@shared/helpers";

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
    ...parseListSearchState(params),
    ...parseControllersSearchState(params),
    tab: COMPANY_DETAILS_TABS.includes(tab as CompanyDetailsTab)
      ? (tab as CompanyDetailsTab)
      : DEFAULT_COMPANY_DETAILS_TAB,
  };
};

export const createCompanyDetailsSearchString = ({
  tab,
  ...listState
}: CompanyDetailsSearchState) => {
  const usersParams = new URLSearchParams(createListSearchString(listState));
  const controllersParams = new URLSearchParams(
    createControllersSearchString({
      ...listState,
      companyId: "",
    }),
  );

  const mergedParams = new URLSearchParams();
  usersParams.forEach((value, key) => mergedParams.set(key, value));
  controllersParams.forEach((value, key) => mergedParams.set(key, value));

  if (tab !== DEFAULT_COMPANY_DETAILS_TAB) {
    mergedParams.set("tab", tab);
  }

  return mergedParams.toString();
};
