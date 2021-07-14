import React, { useState, useEffect } from "react";
import { Segment, Container } from "semantic-ui-react";
import { Home, Plus, Bookmark, User, Archive } from "react-feather";
import "../css/bootstrap-4-utilities.min.css";
import "../css/navbar.css";

const Navbar = () => {
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
    <nav className="px-0 mx-0">{isMobile ? <MobileNav /> : <DesktopNav />}</nav>
  );
};

const MobileNav = () => {
  return (
    <Container fluid className="px-0">
      <Segment color="teal" className="p-0 mobile-nav-segment">
        <ul className="mobile-ul p-0 mx-0">
          <li>
            <a href="./" className="mobile-link">
              <Home size={25} color="teal" />
              <h5 className="p-0 m-0">Home</h5>
            </a>
          </li>
          <li>
            <a href="./" className="mobile-link">
              <Archive size={25} color="teal" />
              <h5 className="p-0 m-0">Archive</h5>
            </a>
          </li>
          <li id="create-button-mobile">
            <a href="./" className="mobile-link">
              <Plus size={25} color="white" />
              <h5 className="p-0 m-0" style={{ color: "white" }}>
                Create
              </h5>
            </a>
          </li>
          <li>
            <a href="./" className="mobile-link">
              <Bookmark size={25} color="teal" />
              <h5 className="p-0 m-0">Blog</h5>
            </a>
          </li>
          <li>
            <a href="./" className="mobile-link">
              <User size={25} color="teal" />
              <h5 className="p-0 m-0">Profile</h5>
            </a>
          </li>
        </ul>
      </Segment>
    </Container>
  );
};

const DesktopNav = () => {
  return (
    <Container className="px-0" fluid>
      <Segment raised className="px-5 desktop-nav-segment py-0">
        <h2 className="m-0" style={{ color: "teal" }}>
          what-todo.app
        </h2>
        <ul className="desktop-ul">
          <li>
            <a href="./" className="desktop-link">
              <Home size={32} color="teal" />
              <h5 className="p-0 m-0">Home</h5>
            </a>
          </li>
          <li>
            <a href="./" className="desktop-link">
              <Archive size={32} color="teal" />
              <h5 className="p-0 m-0">Archive</h5>
            </a>
          </li>
          <li id="create-button-desktop">
            <a href="./" className="desktop-link py-2">
              <Plus size={25} color="white" />
              <h5 className="p-0 m-0" style={{ color: "white" }}>
                Create
              </h5>
            </a>
          </li>
          <li>
            <a href="./" className="desktop-link">
              <Bookmark size={32} color="teal" />
              <h5 className="p-0 m-0">Blog</h5>
            </a>
          </li>
          <li>
            <a href="./" className="desktop-link">
              <User size={32} color="teal" />
              <h5 className="p-0 m-0">Profile</h5>
            </a>
          </li>
        </ul>
      </Segment>
    </Container>
  );
};

export default Navbar;
