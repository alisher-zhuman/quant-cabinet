import { useState } from "react";

interface Params {
  initialPage?: number;
  initialLimit?: number;
  resetPage?: number;
}

export const usePagination = ({
  initialPage = 0,
  initialLimit = 10,
  resetPage,
}: Params = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  
  const pageToReset = resetPage ?? initialPage;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(pageToReset);
  };

  return {
    page,
    limit,
    setPage,
    setLimit: handleLimitChange,
  };
};
