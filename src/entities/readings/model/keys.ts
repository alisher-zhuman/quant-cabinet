export const readingsKeys = {
  all: ["readings"] as const,
  list: (
    meterId: string,
    serialNumber: string,
    port: number | undefined,
    from: string,
    to: string,
    page: number,
    limit: number,
  ) =>
    [
      ...readingsKeys.all,
      meterId,
      serialNumber,
      port,
      from,
      to,
      page,
      limit,
    ] as const,
};
