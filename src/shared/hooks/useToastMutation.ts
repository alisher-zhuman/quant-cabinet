import {
  type MutationFunction,
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

type PendingMessage<TVariables> =
  | string
  | ((variables: TVariables) => string | null | undefined);

type ToastMessage<TValue, TVariables> =
  | string
  | ((value: TValue, variables: TVariables) => string | null | undefined);

type ToastMutationOptions<TData, TError, TVariables, TOnMutateResult> = Omit<
  UseMutationOptions<TData, TError, TVariables, TOnMutateResult>,
  "mutationFn" | "onSuccess"
> & {
  mutationFn: MutationFunction<TData, TVariables>;
  invalidateKeys?: QueryKey[];
  pendingMessage?: PendingMessage<TVariables>;
  successMessage?: ToastMessage<TData, TVariables>;
  errorMessage?: ToastMessage<TError, TVariables>;
  onSuccess?: UseMutationOptions<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >["onSuccess"];
};

const resolvePendingMessage = <TVariables>(
  message: PendingMessage<TVariables> | undefined,
  variables: TVariables,
) => {
  if (!message) {
    return null;
  }

  return typeof message === "function" ? message(variables) : message;
};

const resolveToastMessage = <TValue, TVariables>(
  message: ToastMessage<TValue, TVariables> | undefined,
  value: TValue,
  variables: TVariables,
) => {
  if (!message) {
    return null;
  }

  return typeof message === "function" ? message(value, variables) : message;
};

export const useToastMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TOnMutateResult = unknown,
>(
  options: ToastMutationOptions<TData, TError, TVariables, TOnMutateResult>,
): UseMutationResult<TData, TError, TVariables, TOnMutateResult> => {
  const queryClient = useQueryClient();

  const {
    mutationFn,
    invalidateKeys,
    pendingMessage,
    successMessage,
    errorMessage,
    onSuccess,
    ...rest
  } = options;

  return useMutation<TData, TError, TVariables, TOnMutateResult>({
    ...rest,
    mutationFn: (variables, context) => {
      const request = mutationFn(variables, context);
      const hasToastConfig = pendingMessage || successMessage || errorMessage;

      if (!hasToastConfig) {
        return request;
      }

      const toastMessages = {
        loading: resolvePendingMessage(pendingMessage, variables) ?? "Загрузка...",
        ...(successMessage
          ? {
              success: (data: TData) =>
                resolveToastMessage(successMessage, data, variables) ?? null,
            }
          : {}),
        ...(errorMessage
          ? {
              error: (error: unknown) =>
                resolveToastMessage(errorMessage, error as TError, variables) ??
                null,
            }
          : {}),
      };

      return toast.promise(request, toastMessages);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      if (invalidateKeys?.length) {
        invalidateKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      void onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};
