import type { MouseEvent } from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import type { ControllerRow } from "@entities/controllers";

interface Props {
  controller: ControllerRow;
  editLabel: string;
  transferLabel: string;
  deleteLabel: string;
  onEdit: (controller: ControllerRow) => void;
  onTransfer: (controller: ControllerRow) => void;
  onDelete: (controller: ControllerRow) => void;
  role?: string | null;
}

export const ControllerActions = ({
  controller,
  editLabel,
  transferLabel,
  deleteLabel,
  onEdit,
  onTransfer,
  onDelete,
  role,
}: Props) => {
  const handleActionClick =
    (callback: (controller: ControllerRow) => void) =>
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      callback(controller);
    };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
      {role !== "user" && (
        <Tooltip title={editLabel}>
          <IconButton
            aria-label={editLabel}
            color="primary"
            onClick={handleActionClick(onEdit)}
          >
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      )}

      {role === "admin" && (
        <Tooltip title={transferLabel}>
          <IconButton
            aria-label={transferLabel}
            color="secondary"
            onClick={handleActionClick(onTransfer)}
          >
            <SwapHorizRoundedIcon />
          </IconButton>
        </Tooltip>
      )}

      {role !== "user" && (
        <Tooltip title={deleteLabel}>
          <IconButton
            aria-label={deleteLabel}
            color="error"
            onClick={handleActionClick(onDelete)}
          >
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>

  );
};
