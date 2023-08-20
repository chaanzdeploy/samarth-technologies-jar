import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const SelectX = (props) => {
  const {
    name,
    value,
    label,
    onChange,
    disabled = false,
    options,
    size = "small",
    customStyle,
    error = null,
  } = props;

  return (
    <FormControl
      {...(error && { error: true })}
      variant="outlined"
      size={size}
      disabled={disabled}
      fullWidth
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        style={customStyle}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectX;
