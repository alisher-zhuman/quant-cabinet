import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@shared/constants";
import { parseBooleanFlag, parsePositiveInt } from "@shared/helpers";

import type { CompaniesSearchState } from "../types";

export const parseCompaniesSearchState = (
  params: URLSearchParams,
): CompaniesSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const search = params.get("search")?.trim() ?? "";
  const archivedRaw = params.get("archived");

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    search,
    isArchived: parseBooleanFlag(archivedRaw),
  };
};

export const createCompaniesSearchString = ({
  page,
  limit,
  search,
  isArchived,
}: CompaniesSearchState) => {
  const params = new URLSearchParams();
  const normalizedSearch = search.trim();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (normalizedSearch) {
    params.set("search", normalizedSearch);
  }

  if (isArchived) {
    params.set("archived", "1");
  }

  return params.toString();
};
