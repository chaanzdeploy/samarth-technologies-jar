import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  label: {
    textTransform: "none",
  },
}));

const ButtonX = (props) => {
  const classes = useStyles();
  const {
    text,
    size = "medium",
    variant = "contained",
    color = "primary",
    onClick,
    ...other
  } = props;

  return (
    <Button
      size={size}
      color={color}
      variant={variant}
      onClick={onClick}
      className={[classes.root, classes.label].join(" ")}
      {...other}
    >
      {text}
    </Button>
  );
};

export default ButtonX;
