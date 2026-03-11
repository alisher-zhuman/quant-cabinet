import { useState } from "react";

import { useDebounce } from "./useDebounce";

interface Params {
  initialSearch?: string;
}

export const useSearchState = ({ initialSearch = "" }: Params = {}) => {
  const [search, setSearch] = useState(initialSearch);

  const debouncedSearch = useDebounce(search);

  return {
    search,
    debouncedSearch,
    setSearch,
  };
};
