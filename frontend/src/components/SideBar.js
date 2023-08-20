import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { TABS } from "../utils/data";

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar, // necessary for content to be below app bar
  sideBar: { backgroundColor: "#03045e", height: "100%" },
  listItem: {
    "&:hover": {
      backgroundColor: "#35367E",
    },
  },
}));

const SideBar = (props) => {
  const classes = useStyles();
  const { handleDrawerToggle } = props;

  return (
    <div className={classes.sideBar}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {TABS.map((tab) => (
          <Link
            to={tab.path}
            style={linkStyle}
            onClick={handleDrawerToggle}
            key={tab.name}
          >
            <ListItem button key={tab.name} className={classes.listItem}>
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default SideBar;
