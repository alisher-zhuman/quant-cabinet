import { useState } from "react";

import { useDebounce } from "@shared/hooks";

interface Params {
  initialSearch?: string;
}

export const useUserSearch = ({ initialSearch = "" }: Params = {}) => {
  const [search, setSearch] = useState(initialSearch);

  const debouncedSearch = useDebounce(search);

  return {
    search,
    debouncedSearch,
    setSearch,
  };
};
