import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Container, Image, Header } from "semantic-ui-react";
import { Clipboard } from "react-feather";
import MainNav from "./MainNav";

// MEDIA
import landingPageTextBg from "../media/landing-page-text-bg.png";

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
        <MainNav />
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

export default Home;
