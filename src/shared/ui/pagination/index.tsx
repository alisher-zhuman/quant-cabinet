import TablePagination from "@mui/material/TablePagination";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  rowsPerPageOptions?: number[] | undefined;
  labelRowsPerPage?: string | undefined;
}

export const Pagination = ({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  rowsPerPageOptions = [5, 10, 20],
  labelRowsPerPage,
}: Props) => (
  <TablePagination
    component="div"
    count={total}
    page={page}
    rowsPerPage={limit}
    rowsPerPageOptions={rowsPerPageOptions}
    labelRowsPerPage={labelRowsPerPage}
    onPageChange={(_, newPage) => {
      onPageChange(newPage);
    }}
    onRowsPerPageChange={(event) => {
      onLimitChange(Number(event.target.value));
    }}
  />
);
