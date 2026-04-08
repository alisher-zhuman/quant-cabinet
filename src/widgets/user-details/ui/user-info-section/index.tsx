import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { UserDetails } from "@entities/users";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  user: UserDetails | null;
  userId?: string | undefined;
  userStatus: string;
  fullName: string;
}

export const UserInfoSection = ({
  t,
  user,
  userId,
  userStatus,
  fullName,
}: Props) => (
  <Stack spacing={3}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography variant="h4" fontWeight={700}>
        {fullName || user?.email || "-"}
      </Typography>

      <Typography color="text.secondary">{user?.email ?? userId ?? "-"}</Typography>
    </Box>

    <Stack spacing={1.5}>
      <Typography variant="subtitle2" color="text.secondary">
        {t("users.details.sections.user")}
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.88),
          border: "1px solid",
          borderColor: "divider",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1.25,
        }}
      >
        <DetailRow
          label={t("users.details.fields.email")}
          value={user?.email ?? "-"}
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
          label={t("users.details.fields.isArchived")}
          value={user ? userStatus : "-"}
        />
        <DetailRow
          label={t("users.details.fields.firstName")}
          value={user?.firstName ?? "-"}
        />
        <DetailRow
          label={t("users.details.fields.lastName")}
          value={user?.lastName ?? "-"}
        />
        <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
          <DetailRow
            label={t("users.details.fields.descriptions")}
            value={user?.descriptions || "-"}
          />
        </Box>
        <DetailRow
          label={t("users.details.fields.createdAt")}
          value={user?.createdAt ? formatDate(user.createdAt) : "-"}
        />
        <DetailRow
          label={t("users.details.fields.updatedAt")}
          value={user?.updatedAt ? formatDate(user.updatedAt) : "-"}
        />
        <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
          <DetailRow
            label={t("users.details.fields.id")}
            value={user?.id ?? "-"}
          />
        </Box>
      </Box>
    </Stack>
  </Stack>
);
