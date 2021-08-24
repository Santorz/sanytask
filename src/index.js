import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./dashboard";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/404-page";
import { PersonComponent } from "./pages/Parse_Demo";

// Parse SDK
// Import Parse minified version
import Parse from "parse/dist/parse.min.js";
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from "./parse-sdk/config";

// CSS
import "semantic-ui-css/semantic.min.css";
import "./css/bootstrap-utilities.min.css";
import "./css/index.css";
import "./css/cust-utils.css";

// FUNCS

const MainBodyContainer = () => {
  // Initialize Parse
  useEffect(() => {
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;
  }, []);
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
          <Route path="/parse-demo">
            <PersonComponent />
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
