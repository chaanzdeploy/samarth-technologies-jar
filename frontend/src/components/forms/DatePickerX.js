import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePickerX = (props) => {
  const { name, value, label, onChange } = props;

  const convertToDefaultEventParameter = (name, value) => ({
    target: {
      name: name,
      value: value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MM/yyyy"
        name={name}
        value={value}
        onChange={(date) =>
          onChange(convertToDefaultEventParameter(name, date))
        }
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerX;
