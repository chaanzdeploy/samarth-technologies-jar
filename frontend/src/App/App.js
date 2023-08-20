import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { LIGHTER_BLUE } from "../utils/colors";
import NavBar from "../components/NavBar";
import { BASE_ROUTE } from "../utils/constants";
import { makeStyles } from "@material-ui/core/styles";
import ServicesPage from "../pages/ServicesPage";
import CustomersPage from "../pages/CustomersPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // display: flex doesn't contain the services page inside the body in small screens
    // [theme.breakpoints.down("sm")]: {
    //   display: "block",
    // },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    padding: theme.spacing(2),
    backgroundColor: LIGHTER_BLUE,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router basename={BASE_ROUTE}>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/services" component={ServicesPage} />
            <Route path="/customers" component={CustomersPage} />
            {/* <Route exact path="/inventory" component={InventoryPage} />
            <Route exact path="/dashboard" component={DashboardPage} /> */}
            <Route exact path="/">
              <Redirect to="/services" />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
