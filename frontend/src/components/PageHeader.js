import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { DARK_BLUE, LIGHTER_BLUE } from "../utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: LIGHTER_BLUE,
  },
  pageHeader: {
    padding: theme.spacing(1),
    display: "flex",
    marginBottom: theme.spacing(1),
    alignItems: "center",
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(1),
    color: DARK_BLUE,
  },
  pageTitle: {
    paddingLeft: theme.spacing(2),
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { icon, title } = props;

  return (
    <Paper elevation={1} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
