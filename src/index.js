import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Container, Image, Segment, Header } from "semantic-ui-react";
import { Clipboard } from "react-feather";
import Dashboard from "./dashboard";
import ErrorPage from "./pages/404-page";

// CSS
import "semantic-ui-css/semantic.min.css";
import "./css/bootstrap-utilities.min.css";
import "./css/index.css";
import "./css/cust-utils.css";

// MEDIA
import landingPageTextBg from "./media/landing-page-text-bg.png";

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
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
      {/* end of router setup */}
    </>
  );
};

// Home
const Home = () => {
  // VARS
  // const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });
  const isTabletandAbove = useMediaQuery({ query: "(min-width:768px)" });

  return (
    <Container fluid id="main-part-container" className="position-relative">
      <Image
        fluid
        src={landingPageTextBg}
        className={`animate__animated animate__slideInDown animate__fast`}
        id="landing-page-text-bg"
      ></Image>
      <div
        className="position-absolute d-flex flex-column"
        id="nav-and-app-details-container"
      >
        <Segment
          className="position-relative px-2 px-md-3 px-lg-4 px-xl-5 my-0 w-100 rounded-0"
          id="landing-page-nav"
          raised
        >
          <h2 id="landing-page-nav-app-name" className="">
            my-next-task
          </h2>
        </Segment>
        <div
          className="d-flex position-relative justify-content-around mt-md-4 mt-lg-5 user-select-none align-items-start"
          id="app-details-container"
        >
          <section className="px-3 pt-4 pt-sm-5 pt-md-4 pt-lg-4 px-md-4 px-lg-5 text-left align-self-start">
            <Header
              id="landing-page-app-caption"
              className="open-sans-font mb-0"
            >
              Organize your tasks with ease.
            </Header>
            <h3 className="mt-1 mb-2 text-whitesmoke">
              A seamless solution to activity management. In just a few clicks,
              you can get your activity planning done.
            </h3>
            <div className="d-flex pt-3 pt-md-1 pt-lg-5">
              <Link
                to="/login"
                className="d-block text-whitesmoke me-3 landing-page-main-action-link"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="d-block text-whitesmoke ms-3 landing-page-main-action-link"
              >
                Sign up
              </Link>
            </div>
          </section>
          {isTabletandAbove && (
            <section className="px-5 text-left align-self-center">
              <Clipboard size={200} className="text-whitesmoke" />
            </section>
          )}
        </div>
      </div>
    </Container>
  );
};

ReactDOM.render(<MainBodyContainer />, document.getElementById("root"));
