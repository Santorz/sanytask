import React, { useState, useEffect, useRef } from "react";
import { Segment, Container, Ref } from "semantic-ui-react";
import { Home, Plus, Bookmark, User, Archive } from "react-feather";
import "../css/bootstrap-utilities.min.css";
import "../css/navbar.css";

const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};

const Navbar = React.forwardRef((props, ref) => {
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 768;

  return (
    <nav className="px-0 mx-0">
      {isMobile ? <MobileNav ref={ref} /> : <DesktopNav />}
    </nav>
  );
});

const MobileNav = React.forwardRef((props, ref) => {
  const triggerCreateNewTodoModalRef = useRef(null);

  return (
    <Container fluid className="px-0">
      <Ref innerRef={ref}>
        <Segment className="p-0 mobile-nav-segment" id="mobile-nav">
          <ul className="mobile-ul p-0 mx-0">
            <li>
              <a href="./" className="mobile-link">
                <Home size={25} color="#006976" />
                <h5 className="p-0 m-0">Home</h5>
              </a>
            </li>
            <li>
              <a href="./" className="mobile-link">
                <Archive size={25} color="#006976" />
                <h5 className="p-0 m-0">Archive</h5>
              </a>
            </li>
            <li id="create-button-mobile-li">
              <button
                ref={triggerCreateNewTodoModalRef}
                id="create-button-mobile"
                className="mobile-link"
                style={{ backgroundColor: "#006976" }}
                onClick={() =>
                  openCreateNewTodoModal(triggerCreateNewTodoModalRef)
                }
              >
                <Plus size={25} color="white" />
                <h5 className="p-0 m-0" style={{ color: "white" }}>
                  Create
                </h5>
              </button>
            </li>
            <li>
              <a href="./" className="mobile-link">
                <Bookmark size={25} color="#006976" />
                <h5 className="p-0 m-0">Blog</h5>
              </a>
            </li>
            <li>
              <a href="./" className="mobile-link">
                <User size={25} color="#006976" />
                <h5 className="p-0 m-0">Profile</h5>
              </a>
            </li>
          </ul>
        </Segment>
      </Ref>
    </Container>
  );
});

const DesktopNav = () => {
  const triggerCreateNewTodoModalRef = useRef(null);

  return (
    <Container className="px-0" fluid>
      <Segment raised className="px-5 desktop-nav-segment py-0">
        <h2 className="m-0" style={{ color: "#006976", userSelect: "none" }}>
          My Next Task
        </h2>
        <ul className="desktop-ul">
          <li>
            <a href="./" className="desktop-link">
              <Home size={28} color="#006976" />
              <h5 className="p-0 m-0">Home</h5>
            </a>
          </li>
          <li>
            <a href="./" className="desktop-link">
              <Archive size={28} color="#006976" />
              <h5 className="p-0 m-0">Archive</h5>
            </a>
          </li>
          <li id="create-button-desktop-li">
            <button
              ref={triggerCreateNewTodoModalRef}
              className="desktop-link py-2"
              id="create-button-desktop"
              style={{ backgroundColor: "#006976" }}
              onClick={() =>
                openCreateNewTodoModal(triggerCreateNewTodoModalRef)
              }
            >
              <Plus size={23} color="white" />
              <h5 className="p-0 m-0" style={{ color: "white" }}>
                Create
              </h5>
            </button>
          </li>

          <li>
            <a href="./" className="desktop-link">
              <Bookmark size={28} color="#006976" />
              <h5 className="p-0 m-0">Blog</h5>
            </a>
          </li>
          <li>
            <a href="./" className="desktop-link">
              <User size={28} color="#006976" />
              <h5 className="p-0 m-0">Profile</h5>
            </a>
          </li>
        </ul>
      </Segment>
    </Container>
  );
};

export default Navbar;
