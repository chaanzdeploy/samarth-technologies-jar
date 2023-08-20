import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { MODERATE_BLUE } from "../utils/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: MODERATE_BLUE,
  },
}));

export default function InnerNavBar() {
  const classes = useStyles();
  const location = useLocation();
  const { path, url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={location.pathname} variant="fullWidth">
          <Tab
            label="Services"
            component={Link}
            to={`${url}`}
            value={`${url}`}
          />
          <Tab
            label="Escalated Services"
            component={Link}
            to={`${url}/escalationList`}
            value={`${url}/escalationList`}
          />
          <Tab
            label="Requests"
            component={Link}
            to={`${url}/requests`}
            value={`${url}/requests`}
          />
        </Tabs>
      </AppBar>

      <Switch>
        <Route exact path={`${path}`}>
          List Services
        </Route>
        <Route path={`${path}/escalationList`}>List Escalation Services</Route>
        <Route path={`${path}/requests`}>List Requests</Route>
      </Switch>
    </div>
  );
}
