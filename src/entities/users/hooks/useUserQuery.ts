import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api";
import { usersKeys } from "../model/keys";

export const useUserQuery = (userId: string | undefined) => {
  const query = useQuery({
    queryKey: userId ? usersKeys.detail(userId) : [...usersKeys.all, "detail"],
    queryFn: () => {
      if (!userId) {
        throw new Error("User id is required");
      }

      return getUser(userId);
    },
    enabled: Boolean(userId),
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
