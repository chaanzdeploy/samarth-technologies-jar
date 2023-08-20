import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5), // consider revisiting this style
    },
  },
}));

export const useForm = (
  formDefaultValues,
  validateFormOnChange = false,
  validateForm
) => {
  const [values, setValues] = useState(formDefaultValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (validateFormOnChange) {
      validateForm({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues({ ...formDefaultValues });
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export const Form = (props) => {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} {...other}>
      {children}
    </form>
  );
};
