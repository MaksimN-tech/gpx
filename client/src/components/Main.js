import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#ffffff !important",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {!token && (
            <Link to="/login">
              <Button className={classes.title} color="secondary">Login</Button>
            </Link>
          )}
          {token && (
            <Link to="/update">
              <Button className={classes.title} color="secondary">Update</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
