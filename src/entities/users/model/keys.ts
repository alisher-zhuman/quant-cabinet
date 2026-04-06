export const usersKeys = {
  all: ["users"] as const,
  list: (
    page: number,
    limit: number,
    firstName: string,
    lastName: string,
    isArchived: boolean,
    companyId: string,
  ) =>
    [
      ...usersKeys.all,
      page,
      limit,
      firstName,
      lastName,
      isArchived,
      companyId,
    ] as const,
  detail: (email: string) => [...usersKeys.all, "detail", email] as const,
};
