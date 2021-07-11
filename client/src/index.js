import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Update from "./components/Update";
import Login from "./components/Login";

import "./index.css";

ReactDOM.render(
  <>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/update" exact>
          <Update />
        </Route>
      </Switch>
    </Router>
  </>,
  document.getElementById("root")
);
