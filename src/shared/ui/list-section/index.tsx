import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { Loader } from "@shared/ui/loader";

interface Props {
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  hasItems: boolean;
  emptyText?: string | undefined;
  toolbar?: ReactNode;
  pagination?: ReactNode;
  children?: ReactNode;
}

export const ListSection = ({
  isLoading,
  isError,
  errorText,
  hasItems,
  emptyText,
  toolbar,
  pagination,
  children,
}: Props) => {
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">{errorText}</Alert>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {toolbar}

      {!hasItems && emptyText ? <Alert severity="info">{emptyText}</Alert> : null}

      {hasItems ? (
        <>
          {children}
          {pagination}
        </>
      ) : null}
    </Box>
  );
};
