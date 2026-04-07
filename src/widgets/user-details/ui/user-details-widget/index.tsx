import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

import { useUserDetailsWidget } from "../../hooks/useUserDetailsWidget";

export const UserDetailsWidget = () => {
  const {
    t,
    userId,
    user,
    backTo,
    userStatus,
    companyStatus,
    fullName,
    canShowCompanyDetails,
  } = useUserDetailsWidget();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        width: "100%",
        maxWidth: "none",
      }}
    >
      <Button
        component={Link}
        to={backTo}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
      >
        {t("users.details.back")}
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="h4" fontWeight={700}>
              {fullName || user?.email || "-"}
            </Typography>

            <Typography color="text.secondary">
              {user?.email ?? userId ?? "-"}
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2" color="text.secondary">
              {t("users.details.sections.user")}
            </Typography>

            <Box
              sx={{
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

          {canShowCompanyDetails && (
            <>
              <Divider />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2" color="text.secondary">
                   {t("users.details.sections.company")}
                </Typography>

                <Box
                  sx={{
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
                      user?.company?.createdAt
                        ? formatDate(user.company.createdAt)
                        : "-"
                    }
                  />
                  <DetailRow
                    label={t("users.details.fields.companyUpdatedAt")}
                    value={
                      user?.company?.updatedAt
                        ? formatDate(user.company.updatedAt)
                        : "-"
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
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
