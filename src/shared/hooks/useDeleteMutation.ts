import type { MutationFunction, QueryKey } from "@tanstack/react-query";

import { getApiErrorMessage } from "../helpers";
import { useToastMutation } from "./useToastMutation";

interface UseDeleteMutationOptions<TVariables> {
  mutationFn: MutationFunction<void, TVariables>;
  invalidateKeys: QueryKey[];
  pendingMessage: string;
  successMessage: string;
  errorFallbackMessage: string;
  onSuccess?: (() => void) | undefined;
}

export const useDeleteMutation = <TVariables>({
  mutationFn,
  invalidateKeys,
  pendingMessage,
  successMessage,
  errorFallbackMessage,
  onSuccess,
}: UseDeleteMutationOptions<TVariables>) =>
  useToastMutation({
    mutationFn,
    invalidateKeys,
    pendingMessage,
    successMessage,
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, errorFallbackMessage),
    onSuccess: () => {
      onSuccess?.();
    },
  });
