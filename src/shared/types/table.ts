import type { ReactNode } from "react";

import type { TableCellProps } from "@mui/material/TableCell";

export interface Column<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: TableCellProps["align"];
  hiddenOnMobile?: boolean;
}
