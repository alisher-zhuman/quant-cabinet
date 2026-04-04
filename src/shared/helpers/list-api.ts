interface BuildListQueryParamsOptions {
  page: number;
  limit: number;
  isArchived: boolean;
  search?: string;
  searchParamName?: string;
  extraParams?: Record<string, string | undefined>;
}

export const buildListQueryParams = ({
  page,
  limit,
  isArchived,
  search = "",
  searchParamName = "search",
  extraParams = {},
}: BuildListQueryParamsOptions) => {
  const normalizedSearch = search.trim();

  const normalizedExtraParams = Object.fromEntries(
    Object.entries(extraParams).filter(([, value]) => value?.trim()),
  );

  return {
    page,
    limit,
    isArchived,
    ...(normalizedSearch ? { [searchParamName]: normalizedSearch } : {}),
    ...normalizedExtraParams,
  };
};
