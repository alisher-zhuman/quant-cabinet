export const companiesKeys = {
  all: ["companies"] as const,
  list: (page: number, limit: number, search: string, isArchived: boolean) =>
    [...companiesKeys.all, page, limit, search, isArchived] as const,
  detail: (id: string) => [...companiesKeys.all, "detail", id] as const,
  myCompany: () => [...companiesKeys.all, "my-company"] as const,
};
