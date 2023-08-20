import React from "react";
import TextField from "@material-ui/core/TextField";

const TextFieldX = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    isMultiLine = false,
    error = null,
    disabled = false,
    ...other
  } = props;

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      variant="outlined"
      disabled={disabled}
      onChange={onChange}
      multiline={isMultiLine}
      InputLabelProps={{ shrink: true }}
      {...(isMultiLine && { maxRows: 3 })}
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};

export default TextFieldX;
