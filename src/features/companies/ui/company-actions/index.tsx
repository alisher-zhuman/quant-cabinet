import type { MouseEvent } from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import type { CompanyRow } from "@entities/companies";

interface Props {
  company: CompanyRow;
  editLabel: string;
  deleteLabel: string;
  onEdit: (company: CompanyRow) => void;
  onDelete: (company: CompanyRow) => void;
}

export const CompanyActions = ({
  company,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: Props) => {
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit(company);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(company);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
      <IconButton
        aria-label={editLabel}
        color="primary"
        onClick={handleEditClick}
      >
        <EditOutlinedIcon />
      </IconButton>

      <IconButton
        aria-label={deleteLabel}
        color="error"
        onClick={handleDeleteClick}
      >
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};
