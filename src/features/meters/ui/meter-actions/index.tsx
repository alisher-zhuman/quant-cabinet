import type { MouseEvent } from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import type { MeterRow } from "@entities/meters";

import { isUser } from "@shared/helpers";
import type { UserRole } from "@shared/types";

interface Props {
  deleteLabel: string;
  editLabel: string;
  meter: MeterRow;
  onDelete: (meter: MeterRow) => void;
  onEdit: (meter: MeterRow) => void;
  role?: UserRole | null | undefined;
}

export const MeterActions = ({
  deleteLabel,
  editLabel,
  onDelete,
  onEdit,
  role,
  meter,
}: Props) => {
  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(meter);
  };

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit(meter);
  };

  return (
    <Stack direction="row" spacing={1}>
      {!isUser(role) && (
        <>
          <Tooltip title={editLabel}>
            <IconButton aria-label={editLabel} color="primary" onClick={handleEditClick}>
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>

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
      )}
    </Stack>
  );
};
