import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { useUserDetailsWidget } from "../../hooks/useUserDetailsWidget";
import { UserCompanySection } from "../user-company-section";
import { UserInfoSection } from "../user-info-section";

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
          <UserInfoSection
            t={t}
            user={user}
            userId={userId}
            userStatus={userStatus}
            fullName={fullName}
          />

          {canShowCompanyDetails && (
            <>
              <Divider />
              <UserCompanySection
                t={t}
                user={user}
                companyStatus={companyStatus}
              />
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
