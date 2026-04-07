export const usersKeys = {
  all: ["users"] as const,
  list: (
    page: number,
    limit: number,
    search: string,
    firstName: string,
    lastName: string,
    isArchived: boolean,
    companyId: string,
  ) =>
    [
      ...usersKeys.all,
      page,
      limit,
      search,
      firstName,
      lastName,
      isArchived,
      companyId,
    ] as const,
  detail: (userId: string) => [...usersKeys.all, "detail", userId] as const,
};
