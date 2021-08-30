import React, { useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Menu, X } from "react-feather";
import { Segment, Ref } from "semantic-ui-react";
import {
  // getCurrentLoggedInUser,
  checkIfUserIsLoggedIn,
} from "../parse-sdk/userVars";

// CSS
import "../css/main-nav.css";

const MainNav = React.forwardRef((props, ref) => {
  // State value for user logged in boolean
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // UseEffect for setting all state values relating to user and its status
  React.useEffect(() => {
    checkIfUserIsLoggedIn().then((resp) => {
      setIsUserLoggedIn(resp);
    });
  }, []);

  const { isMainPageNav } = props;
  // State value to open mobile nav menu or not
  const [openMobileNavMenu, setOpenMobileNavMenu] = useState(false);
  const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });
  const isTabletandAbove = useMediaQuery({ query: "(min-width:768px)" });
  const setMobileNavDynamicClassName = (bool) => {
    if (bool) {
      return "mobile-menu-open";
    } else {
      return "mobile-menu-closed";
    }
  };

  return (
    <>
      {/* This nav is for homepage only */}
      {isMainPageNav === true && (
        <nav>
          <Ref innerRef={ref}>
            <Segment
              className=" d-flex flex-column position-absolute px-0 pb-0 pb-md-3 px-md-3 px-lg-4 px-xl-5 my-0 w-100 rounded-0"
              id="landing-page-nav"
              raised
            >
              <div className="d-inline-flex justify-content-between px-2 align-items-center">
                <h2
                  id="landing-page-nav-app-name"
                  className="mb-0 pb-2 align-self-center"
                >
                  my-next-task
                </h2>
                {isMobileOnly && (
                  <button
                    className="mobile-nav-hamburger-button"
                    type="button"
                    onClick={() => setOpenMobileNavMenu(!openMobileNavMenu)}
                  >
                    {!openMobileNavMenu && <Menu size={32} />}{" "}
                    {openMobileNavMenu && <X size={32} />}
                  </button>
                )}
                {/* Nav ul for Tablet and above only */}
                {isTabletandAbove && (
                  <MainNavUl isMainPageNavBool={isMainPageNav} />
                )}
              </div>

              {isMobileOnly && (
                <section
                  className={` py-2 px-0 mobile-menu-backdrop ${setMobileNavDynamicClassName(
                    openMobileNavMenu
                  )}`}
                >
                  {/* Nav ul for mobile only */}
                  <MainNavUl
                    isMainPageNavBool={isMainPageNav}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                </section>
              )}
            </Segment>
          </Ref>
        </nav>
      )}

      {/* Nav for any page apart from homepage */}
      {isMainPageNav === false && (
        <nav
          className="position-relative"
          style={{ backgroundColor: "#006976" }}
        >
          <Segment
            className=" d-flex flex-column position-relative px-0 pb-0 pb-md-3 px-md-3 px-lg-4 px-xl-5 my-0 w-100 rounded-0"
            id="landing-page-nav"
            raised
          >
            <div className="d-flex justify-content-between px-2">
              <Link to="/" id="landing-page-nav-app-name" className="mb-0 pb-2">
                <h2>my-next-task</h2>
              </Link>
              {isMobileOnly && (
                <button
                  className="mobile-nav-hamburger-button"
                  type="button"
                  onClick={() => setOpenMobileNavMenu(!openMobileNavMenu)}
                >
                  {!openMobileNavMenu && <Menu size={32} />}{" "}
                  {openMobileNavMenu && <X size={32} />}
                </button>
              )}
              {/* Nav ul for Tablet and above only */}
              {isTabletandAbove && (
                <MainNavUl isMainPageNavBool={isMainPageNav} />
              )}
            </div>

            {isMobileOnly && (
              <section
                className={`py-2 px-0 mobile-menu-normal ${setMobileNavDynamicClassName(
                  openMobileNavMenu
                )}`}
              >
                {/* Nav ul for mobile only */}
                <MainNavUl isMainPageNavBool={isMainPageNav} />
              </section>
            )}
          </Segment>
        </nav>
      )}
    </>
  );
});

MainNav.propTypes = {
  isMainPageNav: propTypes.bool.isRequired,
};

//MainNavUl
const MainNavUl = ({ isMainPageNavBool, isUserLoggedIn }) => {
  return (
    <ul
      id="main-nav-ul"
      className="d-flex d-md-inline-flex flex-column my-0 flex-md-row justify-content-between px-3 pt-3 pt-md-0"
    >
      {isMainPageNavBool && isUserLoggedIn && (
        <li>
          <Link to="/dashboard" className="main-nav-link">
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <Link to="/about" className="main-nav-link">
          About
        </Link>
      </li>
      <li>
        <Link to="/blog" className="main-nav-link">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/contact" className="main-nav-link">
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default MainNav;
