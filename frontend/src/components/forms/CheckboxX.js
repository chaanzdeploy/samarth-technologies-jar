import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CheckboxX = (props) => {
  const { name, value, label, onChange } = props;
  const convertToDefaultEventParameter = (name, value) => ({
    target: {
      name: name,
      value: value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            name={name}
            checked={value}
            color="primary"
            onChange={(e) =>
              onChange(convertToDefaultEventParameter(name, e.target.checked))
            }
          />
        }
      />
    </FormControl>
  );
};

export default CheckboxX;
