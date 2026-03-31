import { useQuery } from "@tanstack/react-query";

import { getCompany } from "../api";
import { companiesKeys } from "../model/keys";

export const useCompanyQuery = (id: string | undefined) => {
  const query = useQuery({
    queryKey: id ? companiesKeys.detail(id) : [...companiesKeys.all, "detail"],
    queryFn: () => {
      if (!id) {
        throw new Error("Company id is required");
      }

      return getCompany(id);
    },
    enabled: Boolean(id),
  });

  return {
    company: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
