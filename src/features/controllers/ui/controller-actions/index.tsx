import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import type { ControllerRow } from "@entities/controllers";

interface Props {
  controller: ControllerRow;
  editLabel: string;
  deleteLabel: string;
  onEdit: (controller: ControllerRow) => void;
  onDelete: (controller: ControllerRow) => void;
}

export const ControllerActions = ({
  controller,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: Props) => (
  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
    <IconButton
      aria-label={editLabel}
      color="primary"
      onClick={() => onEdit(controller)}
    >
      <EditRoundedIcon />
    </IconButton>

    <IconButton
      aria-label={deleteLabel}
      color="error"
      onClick={() => onDelete(controller)}
    >
      <DeleteOutlineRoundedIcon />
    </IconButton>
  </Box>
);
