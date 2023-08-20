import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { LIGHT_BLUE, LIGHT_PINK } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  primary: {
    backgroundColor: LIGHT_BLUE,
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
  secondary: {
    backgroundColor: LIGHT_PINK,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
}));

const ActionButton = (props) => {
  const classes = useStyles();
  const { children, color, onClick } = props;

  return (
    <Button
      onClick={onClick}
      size="small"
      className={`${classes.root} ${classes[color]}`}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
