export const getBackTo = (state: unknown, fallback: string): string => {
  if (
    typeof state !== "object" ||
    state === null ||
    !("backTo" in (state as Record<string, unknown>))
  ) {
    return fallback;
  }

  const { backTo } = state as { backTo: unknown };

  return typeof backTo === "string" ? backTo : fallback;
};
