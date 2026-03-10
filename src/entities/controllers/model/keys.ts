export const controllersKeys = {
  all: ["controllers"] as const,
  list: (page: number, limit: number, search: string, isArchived: boolean) =>
    [...controllersKeys.all, page, limit, search, isArchived] as const,
};
