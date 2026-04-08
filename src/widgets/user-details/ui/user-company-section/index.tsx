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
  companyStatus: string;
}

export const UserCompanySection = ({ t, user, companyStatus }: Props) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle2" color="text.secondary">
      {t("users.details.sections.company")}
    </Typography>

    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: (theme) => alpha(theme.palette.info.light, 0.08),
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
        label={t("users.details.fields.companyName")}
        value={user?.company?.name ?? "-"}
      />
      <DetailRow
        label={t("users.details.fields.companyStatus")}
        value={user?.company ? companyStatus : "-"}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("users.details.fields.companyAddress")}
          value={user?.company?.address || "-"}
        />
      </Box>
      <DetailRow
        label={t("users.details.fields.companyCreatedAt")}
        value={
          user?.company?.createdAt ? formatDate(user.company.createdAt) : "-"
        }
      />
      <DetailRow
        label={t("users.details.fields.companyUpdatedAt")}
        value={
          user?.company?.updatedAt ? formatDate(user.company.updatedAt) : "-"
        }
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("users.details.fields.companyId")}
          value={user?.company?.id ?? "-"}
        />
      </Box>
    </Box>
  </Stack>
);
