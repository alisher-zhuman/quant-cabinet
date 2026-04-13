import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import type { Column } from "../../types";

interface Props<T> {
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T, index: number) => string | number;
  onRowClick?: ((row: T) => void) | undefined;
}

export const DataTable = <T,>({
  rows,
  columns,
  getRowId,
  onRowClick,
}: Props<T>) => (
  <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: "auto" }}>
    <Table sx={{ minWidth: 650 }} aria-label="data table">
      <TableHead>
        <TableRow>
          {columns.map(({ id, align, header, hiddenOnMobile }) => (
            <TableCell
              key={id}
              align={align ?? "left"}
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                display: hiddenOnMobile ? { xs: "none", sm: "table-cell" } : "table-cell",
              }}
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={getRowId(row, index)}
            hover
            {...(onRowClick ? { onClick: () => onRowClick(row) } : {})}
            sx={{
              cursor: onRowClick ? "pointer" : "default",
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align ?? "left"}
                sx={{
                  display: column.hiddenOnMobile ? { xs: "none", sm: "table-cell" } : "table-cell",
                }}
              >
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
