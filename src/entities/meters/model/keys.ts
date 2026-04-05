export const metersKeys = {
  all: ["meters"] as const,
  list: (page: number, limit: number, search: string, isArchived: boolean) =>
    [...metersKeys.all, page, limit, search, isArchived] as const,
  details: (id: string) => [...metersKeys.all, "details", id] as const,
};
