import type { MouseEvent } from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import type { MeterRow } from "@entities/meters";

interface Props {
  deleteLabel: string;
  editLabel: string;
  meter: MeterRow;
  onDelete: (meter: MeterRow) => void;
  onEdit?: (meter: MeterRow) => void;
}

export const MeterActions = ({
  deleteLabel,
  editLabel,
  meter,
  onDelete,
  onEdit,
}: Props) => {
  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit?.(meter);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(meter);
  };

  return (
    <>
      {onEdit && editLabel && (
        <Tooltip title={editLabel}>
          <IconButton
            aria-label={editLabel}
            color="primary"
            onClick={handleEditClick}
          >
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title={deleteLabel}>
        <IconButton
          aria-label={deleteLabel}
          color="error"
          onClick={handleDeleteClick}
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
