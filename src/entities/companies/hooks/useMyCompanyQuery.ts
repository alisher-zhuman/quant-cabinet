export const useMyCompanyQuery = () => {
  const query = useQuery({
    queryKey: ["my-company"],
    queryFn: getMyCompany,
  });

  return {
    company: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
