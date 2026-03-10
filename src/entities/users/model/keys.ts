export const usersKeys = {
  all: ["users"] as const,
  list: (page: number, limit: number, search: string, isArchived: boolean) =>
    [...usersKeys.all, page, limit, search, isArchived] as const,
};
