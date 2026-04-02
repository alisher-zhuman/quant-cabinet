import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { UserRow } from "@entities/users";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  open: boolean;
  user: UserRow | null;
  onClose: () => void;
}

export const UserDetailsDialog = ({ open, user, onClose }: Props) => {
  const { t } = useTranslation();

  const userStatus = user?.isArchived
    ? t("users.details.values.archived")
    : t("users.details.values.active");
  const passwordChangeStatus = user?.passwordChange
    ? t("users.details.values.yes")
    : t("users.details.values.no");
  const companyStatus = user?.company?.isArchived
    ? t("users.details.values.archived")
    : t("users.details.values.active");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("users.details.title")}</DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={2.5}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              {t("users.details.sections.user")}
            </Typography>

            <DetailRow label={t("users.details.fields.id")} value={user?.id ?? "-"} />
            <DetailRow
              label={t("users.details.fields.email")}
              value={user?.email ?? "-"}
            />
            <DetailRow
              label={t("users.details.fields.firstName")}
              value={user?.firstName ?? "-"}
            />
            <DetailRow
              label={t("users.details.fields.lastName")}
              value={user?.lastName ?? "-"}
            />
            <DetailRow
              label={t("users.details.fields.role")}
              value={user ? t(`profile.roles.${user.role}`) : "-"}
            />
            <DetailRow
              label={t("users.details.fields.phoneNumber")}
              value={user?.phoneNumber || "-"}
            />
            <DetailRow
              label={t("users.details.fields.descriptions")}
              value={user?.descriptions || "-"}
            />
            <DetailRow
              label={t("users.details.fields.passwordChange")}
              value={passwordChangeStatus}
            />
            <DetailRow
              label={t("users.details.fields.createdAt")}
              value={user?.createdAt ? formatDate(user.createdAt) : "-"}
            />
            <DetailRow
              label={t("users.details.fields.updatedAt")}
              value={user?.updatedAt ? formatDate(user.updatedAt) : "-"}
            />
            <DetailRow
              label={t("users.details.fields.isArchived")}
              value={user ? userStatus : "-"}
            />
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              {t("users.details.sections.company")}
            </Typography>

            <DetailRow
              label={t("users.details.fields.companyId")}
              value={user?.company?.id ?? "-"}
            />
            <DetailRow
              label={t("users.details.fields.companyName")}
              value={user?.company?.name ?? "-"}
            />
            <DetailRow
              label={t("users.details.fields.companyAddress")}
              value={user?.company?.address || "-"}
            />
            <DetailRow
              label={t("users.details.fields.companyStatus")}
              value={user?.company ? companyStatus : "-"}
            />
            <DetailRow
              label={t("users.details.fields.companyCreatedAt")}
              value={user?.company?.createdAt ? formatDate(user.company.createdAt) : "-"}
            />
            <DetailRow
              label={t("users.details.fields.companyUpdatedAt")}
              value={user?.company?.updatedAt ? formatDate(user.company.updatedAt) : "-"}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>{t("users.details.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};
