import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

import MenuItem from "@mui/material/MenuItem";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

interface Option {
  label: string;
  value: string;
}

type Props<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  "children" | "defaultValue" | "name" | "onChange" | "select" | "value"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: Option[];
  emptyOptionLabel?: string;
};

export const FormSelectField = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  helperText,
  emptyOptionLabel,
  ...rest
}: Props<TFieldValues>) => {
  const { field, fieldState } = useController({ name, control });
  const errorMessage = fieldState.error?.message;

  return (
    <TextField
      {...rest}
      {...field}
      select
      value={field.value ?? ""}
      error={Boolean(errorMessage)}
      helperText={errorMessage ?? helperText}
    >
      {emptyOptionLabel ? <MenuItem value="">{emptyOptionLabel}</MenuItem> : null}

      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
