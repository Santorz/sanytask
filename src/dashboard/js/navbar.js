import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Ref } from 'semantic-ui-react';
import { DarkThemeContext } from '../..';
import { Home, Plus, Bookmark, User, FileText } from 'react-feather';
import '../css/navbar.css';

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

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowDimension <= 768;

  return (
    <nav className='px-0 mx-0'>
      {isMobile ? <MobileNav ref={ref} /> : <DesktopNav />}
    </nav>
  );
});

const MobileNav = React.forwardRef((props, ref) => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  const triggerCreateNewTodoModalRef = useRef(null);

  return (
    <Container fluid className='px-0'>
      <Ref innerRef={ref}>
        <Segment
          inverted={isDarkTheme}
          className='p-0 mobile-nav-segment'
          id='mobile-nav'
        >
          <ul className='mobile-ul p-0 mx-0'>
            <li>
              <Link to='/' className='mobile-link'>
                <Home size={25} color={`${tealColorString}`} />
                <h5 className='p-0 m-0'>Home</h5>
              </Link>
            </li>
            <li>
              <Link to='/dashboard#drafts' className='mobile-link'>
                <FileText size={25} color={`${tealColorString}`} />
                <h5 className='p-0 m-0'>Drafts</h5>
              </Link>
            </li>
            <li id='create-button-mobile-li'>
              <button
                ref={triggerCreateNewTodoModalRef}
                id='create-button-mobile'
                className='mobile-link my-primary-bg my-teal-text'
                onClick={() =>
                  openCreateNewTodoModal(triggerCreateNewTodoModalRef)
                }
              >
                <Plus
                  size={35}
                  color={`${tealColorString}`}
                  strokeWidth={2.5}
                />
                {/* <h5 className='p-0 m-0' style={{ color: 'var(--my-teal)' }}>
                  Create
                </h5> */}
              </button>
            </li>
            <li>
              <Link to='/' className='mobile-link'>
                <Bookmark size={25} color={`${tealColorString}`} />
                <h5 className='p-0 m-0'>Blog</h5>
              </Link>
            </li>
            <li>
              <Link to='dashboard#account' className='mobile-link'>
                <User size={25} color={`${tealColorString}`} />
                <h5 className='p-0 m-0'>Account</h5>
              </Link>
            </li>
          </ul>
        </Segment>
      </Ref>
    </Container>
  );
});

const DesktopNav = () => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  return (
    <Container className='px-0' fluid>
      <Segment
        raised
        className='px-5 desktop-nav-segment py-0'
        inverted={isDarkTheme}
      >
        <h2
          className='m-0'
          style={{ color: `${tealColorString}`, userSelect: 'none' }}
        >
          my-next-task
        </h2>
        <ul className='desktop-ul py-1'>
          <li>
            <Link to='/' className='desktop-link'>
              <Home size={28} color={`${tealColorString}`} />
              <h5 className='p-0 m-0'>Home</h5>
            </Link>
          </li>
          <li>
            <Link to='/' className='desktop-link'>
              <FileText size={28} color={`${tealColorString}`} />
              <h5 className='p-0 m-0'>Drafts</h5>
            </Link>
          </li>

          <li>
            <Link to='/' className='desktop-link'>
              <Bookmark size={28} color={`${tealColorString}`} />
              <h5 className='p-0 m-0'>Blog</h5>
            </Link>
          </li>
          <li>
            <Link to='dashboard#account' className='desktop-link'>
              <User size={28} color={`${tealColorString}`} />
              <h5 className='p-0 m-0'>Account</h5>
            </Link>
          </li>
        </ul>
      </Segment>
    </Container>
  );
};

export default Navbar;
