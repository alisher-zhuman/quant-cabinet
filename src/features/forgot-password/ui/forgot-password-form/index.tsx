import { useTranslation } from "react-i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormTextField } from "@shared/ui/form-text-field";
import { LangSwitcher } from "@shared/ui/lang-switcher";

import { useForgotPasswordForm } from "../../hooks/useForgotPasswordForm";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();

  const { control, isValid, isPending, onBack, onSubmit } =
    useForgotPasswordForm();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      px={2}
      bgcolor="background.default"
    >
      <Button
        type="button"
        variant="text"
        onClick={onBack}
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        {t("forgotPassword.actions.back")}
      </Button>

      <LangSwitcher sx={{ position: "absolute", top: 16, right: 16 }} />

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography variant="h5" component="h1" fontWeight={700}>
            {t("forgotPassword.title")}
          </Typography>

          <FormFieldset disabled={isPending}>
            <FormTextField
              label={t("forgotPassword.fields.email")}
              type="email"
              autoComplete="email"
              fullWidth
              required
              name="email"
              control={control}
            />
          </FormFieldset>

          <FormActions
            isSubmitting={isPending}
            submitLabel={t("forgotPassword.actions.submit")}
            submitLabelLoading={t("forgotPassword.actions.submitLoading")}
            align="center"
            fullWidth
            submitProps={{ size: "large", disabled: !isValid }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
