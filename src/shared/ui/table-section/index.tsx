import type { ReactNode } from "react";

import type { Column } from "../../types";
import { DataTable } from "../data-table";
import { ListSection } from "../list-section";
import { Pagination } from "../pagination";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  rowsPerPageOptions?: number[] | undefined;
  labelRowsPerPage?: string | undefined;
}

interface Props<T> {
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  hasItems: boolean;
  emptyText?: string | undefined;
  toolbar?: ReactNode;
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T, index: number) => string | number;
  pagination?: PaginationProps;
}

export const TableSection = <T,>({
  isLoading,
  isError,
  errorText,
  hasItems,
  emptyText,
  toolbar,
  rows,
  columns,
  getRowId,
  pagination,
}: Props<T>) => (
  <ListSection
    isLoading={isLoading}
    isError={isError}
    errorText={errorText}
    hasItems={hasItems}
    emptyText={emptyText}
    toolbar={toolbar}
    pagination={
      pagination ? (
        <Pagination
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          onPageChange={pagination.onPageChange}
          onLimitChange={pagination.onLimitChange}
          rowsPerPageOptions={pagination.rowsPerPageOptions}
          labelRowsPerPage={pagination.labelRowsPerPage}
        />
      ) : undefined
    }
  >
    <DataTable rows={rows} columns={columns} getRowId={getRowId} />
  </ListSection>
);
