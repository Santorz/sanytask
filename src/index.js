import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import Dashboard from "./dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
      <Router hashType="noslash">
        <Switch>
          <Route exact path="/">
            <Helmet>
              <title>my-next-task - Organize your tasks with ease</title>
            </Helmet>
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Helmet>
              <title>Login | my-next-task</title>
            </Helmet>
            <LoginPage />
          </Route>
          <Route path="/signup">
            <Helmet>
              <title>Sign up for an account | my-next-task</title>
            </Helmet>
            <SignupPage />
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
