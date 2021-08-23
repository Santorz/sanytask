import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Container, Image, Header } from "semantic-ui-react";
import { Clipboard } from "react-feather";
import MainNav from "./MainNav";

// MEDIA
import landingPageTextBg from "../media/landing-page-text-bg.png";
import phoneMockupImg from "../media/phone-mockup.png";

// Home
const Home = () => {
  const absNavRef = useRef(null);
  const appDetailsContainerRef = useRef(null);
  // UseEffect for doc_title
  React.useEffect(() => {
    document.title = "my-next-task - Organize your tasks with ease.";
  }, []);
  // UseEfftect for marginTop
  React.useEffect(() => {
    appDetailsContainerRef.current.style.marginTop = `${
      absNavRef.current.offsetHeight + 2
    }px`;
  });

  // VARS
  // const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });
  const isTabletandAbove = useMediaQuery({ query: "(min-width:768px)" });

  return (
    <>
      <Container fluid id="main-part-container" className="position-relative">
        <Image
          fluid
          src={landingPageTextBg}
          className={`animate__animated animate__slideInDown animate__slow`}
          id="landing-page-text-bg"
          style={{ boxShadow: "0 0 3px 3px black" }}
        />
        <div
          className="position-absolute d-flex flex-column"
          id="nav-and-app-details-container"
        >
          <MainNav ref={absNavRef} isMainPageNav={true} />
          <div
            className="d-flex position-relative justify-content-around user-select-none align-items-start"
            id="app-details-container"
            ref={appDetailsContainerRef}
          >
            <section className="position-relative px-3 pt-4 pt-sm-5 pt-md-4 pt-lg-4 px-md-4 px-lg-5 text-left align-self-start">
              <Header
                id="landing-page-app-caption"
                className="open-sans-font mb-0"
              >
                Organize your tasks with ease.
              </Header>
              <h3 className="mt-1 mb-2 text-whitesmoke">
                A seamless solution to activity management. In just a few
                clicks, you can get your activity planning done.
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
                <Image src={phoneMockupImg} width="100%" height="500" />
              </section>
            )}
          </div>
        </div>
      </Container>

      <Container>
        <h1>Veracity</h1>
      </Container>
    </>
  );
};

export default Home;
