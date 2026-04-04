import { useQuery } from "@tanstack/react-query";

import { getController } from "../api";
import { controllersKeys } from "../model/keys";

export const useControllerQuery = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: controllersKeys.details(id),
    queryFn: () => getController(id),
    enabled: Boolean(id),
  });

  return {
    controller: data,
    isLoading,
    isError,
  };
};
