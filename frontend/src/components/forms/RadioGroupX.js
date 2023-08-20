import React from "react";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RadioGroupX = (props) => {
  const { name, label, value, onChange, items, row } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row={row} name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            value={item.id}
            key={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupX;
