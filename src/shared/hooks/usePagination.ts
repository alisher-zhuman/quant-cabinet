import { useState } from "react";

interface Params {
  initialPage?: number;
  initialLimit?: number;
}

export const usePagination = ({
  initialPage = 0,
  initialLimit = 10,
}: Params = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(initialPage);
  };

  return {
    page,
    limit,
    setPage,
    setLimit: handleLimitChange,
  };
};
