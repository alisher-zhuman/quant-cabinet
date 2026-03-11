import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  isLoading = false,
  onClose,
  onConfirm,
}: Props) => (
  <Dialog open={open} onClose={isLoading ? undefined : onClose} fullWidth maxWidth="xs">
    <DialogTitle>{title}</DialogTitle>

    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>

    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onClose} disabled={isLoading}>
        {cancelLabel}
      </Button>

      <Button color="error" variant="contained" onClick={onConfirm} disabled={isLoading}>
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
