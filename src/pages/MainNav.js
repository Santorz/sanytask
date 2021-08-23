import React, { useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Menu, X } from "react-feather";
import { Segment, Ref } from "semantic-ui-react";

// CSS
import "../css/main-nav.css";

const MainNav = React.forwardRef((props, ref) => {
  const { isMainPageNav } = props;
  // State value to open mobile nav menu or not
  const [openMobileNavMenu, setOpenMobileNavMenu] = useState(false);
  const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });
  // const isTabletandAbove = useMediaQuery({ query: "(min-width:768px)" });
  const setMobileNavDynamicClassName = (bool) => {
    if (bool) {
      return "mobile-menu-open";
    } else {
      return "mobile-menu-closed";
    }
  };

  return (
    <>
      {/* This is for homepage only */}
      {isMainPageNav === true && (
        <nav>
          <Ref innerRef={ref}>
            <Segment
              className=" d-flex flex-column position-absolute px-0 pb-1 pb-md-3 px-md-3 px-lg-4 px-xl-5 my-0 w-100 rounded-0"
              id="landing-page-nav"
              raised
            >
              <div className="d-flex justify-content-between px-2">
                <h2 id="landing-page-nav-app-name" className="">
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
              </div>

              {isMobileOnly && (
                <section
                  className={` p-5 mobile-menu-backdrop ${setMobileNavDynamicClassName(
                    openMobileNavMenu
                  )}`}
                ></section>
              )}
            </Segment>
          </Ref>
        </nav>
      )}
      {/* any page apart from homepage */}
      {isMainPageNav === false && (
        <nav
          className="position-relative"
          style={{ backgroundColor: "#006976" }}
        >
          <Segment
            className=" d-flex flex-column position-relative px-0 pb-1 pb-md-3 px-md-3 px-lg-4 px-xl-5 my-0 w-100 rounded-0"
            id="landing-page-nav"
            raised
          >
            <div className="d-flex justify-content-between px-2">
              <Link to="/" id="landing-page-nav-app-name" className="">
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
            </div>

            {isMobileOnly && (
              <section
                className={` p-5 mobile-menu-normal ${setMobileNavDynamicClassName(
                  openMobileNavMenu
                )}`}
              ></section>
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

//MainNav Ul

export default MainNav;
