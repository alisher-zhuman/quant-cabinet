import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api";
import { usersKeys } from "../model/keys";

export const useUserQuery = (email: string | undefined) => {
  const query = useQuery({
    queryKey: email ? usersKeys.detail(email) : [...usersKeys.all, "detail"],
    queryFn: () => {
      if (!email) {
        throw new Error("User email is required");
      }

      return getUser(email);
    },
    enabled: Boolean(email),
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
