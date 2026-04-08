import { useState } from "react";

export const useMeterReadingsFiltersState = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return {
    from,
    to,
    setFrom,
    setTo,
  };
};
