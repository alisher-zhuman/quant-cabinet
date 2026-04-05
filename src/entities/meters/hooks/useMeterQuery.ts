import { useQuery } from "@tanstack/react-query";

import { getMeter } from "../api";
import { metersKeys } from "../model/keys";

export const useMeterQuery = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: metersKeys.details(id),
    queryFn: () => getMeter(id),
    enabled: Boolean(id),
  });

  return {
    meter: data,
    isLoading,
    isError,
  };
};
