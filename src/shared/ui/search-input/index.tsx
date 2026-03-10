import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

interface Props extends Omit<TextFieldProps, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  isLoading = false,
  size = "small",
  ...props
}: Props) => (
  <TextField
    {...props}
    size={size}
    value={value}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
      },
      ...props.sx,
    }}
    onChange={(event) => {
      onChange(event.target.value);
    }}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: isLoading ? (
          <InputAdornment position="end">
            <CircularProgress size={16} />
          </InputAdornment>
        ) : undefined,
      },
    }}
  />
);
