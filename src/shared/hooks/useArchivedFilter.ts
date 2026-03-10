import { useState } from "react";

interface Params {
  initialIsArchived?: boolean;
}

export const useArchivedFilter = ({
  initialIsArchived = false,
}: Params = {}) => {
  const [isArchived, setIsArchived] = useState(initialIsArchived);

  return {
    isArchived,
    setIsArchived,
  };
};
