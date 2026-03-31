interface BuildListQueryParamsOptions {
  page: number;
  limit: number;
  isArchived: boolean;
  search?: string;
  searchParamName?: string;
}

export const buildListQueryParams = ({
  page,
  limit,
  isArchived,
  search = "",
  searchParamName = "search",
}: BuildListQueryParamsOptions) => {
  const normalizedSearch = search.trim();

  return {
    page,
    limit,
    isArchived,
    ...(normalizedSearch ? { [searchParamName]: normalizedSearch } : {}),
  };
};
