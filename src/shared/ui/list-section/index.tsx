import type { ReactNode } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { Loader } from "../loader";

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
}: Props) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {toolbar}

    {isLoading ? <Loader /> : null}

    {!isLoading && isError ? <Alert severity="error">{errorText}</Alert> : null}

    {!isLoading && !isError && !hasItems && emptyText ? (
      <Alert severity="info">{emptyText}</Alert>
    ) : null}

    {!isLoading && !isError && hasItems ? (
      <>
        {children}
        {pagination}
      </>
    ) : null}
  </Box>
);
