import { useQuery } from "@tanstack/react-query";

import { getMyCompany } from "../api";
import { companiesKeys } from "../model/keys";

export const useMyCompanyQuery = () => {
  const query = useQuery({
    queryKey: companiesKeys.myCompany(),
    queryFn: getMyCompany,
  });

  return {
    company: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
