import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import IconButton from "@mui/material/IconButton";

import type { ControllerRow } from "@entities/controllers";

interface Props {
  controller: ControllerRow;
  deleteLabel: string;
  onDelete: (controller: ControllerRow) => void;
}

export const ControllerActions = ({
  controller,
  deleteLabel,
  onDelete,
}: Props) => (
  <IconButton
    aria-label={deleteLabel}
    color="error"
    onClick={() => onDelete(controller)}
  >
    <DeleteOutlineRoundedIcon />
  </IconButton>
);
