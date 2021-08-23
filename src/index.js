import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./dashboard";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/404-page";

// CSS
import "semantic-ui-css/semantic.min.css";
import "./css/bootstrap-utilities.min.css";
import "./css/index.css";
import "./css/cust-utils.css";

// FUNCS

const MainBodyContainer = () => {
  return (
    <>
      {/* router setup */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
      {/* end of router setup */}
    </>
  );
};

ReactDOM.render(<MainBodyContainer />, document.getElementById("root"));
