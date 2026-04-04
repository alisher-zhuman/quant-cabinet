export const controllersKeys = {
  all: ["controllers"] as const,
  list: (
    page: number,
    limit: number,
    search: string,
    isArchived: boolean,
    companyId: string,
    serialNumber: string,
    phoneNumber: string,
    simIMSI: string,
  ) =>
    [
      ...controllersKeys.all,
      page,
      limit,
      search,
      isArchived,
      companyId,
      serialNumber,
      phoneNumber,
      simIMSI,
    ] as const,
};
