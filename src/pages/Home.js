import React, { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
// import { isLocalUserPresentFunc } from '../parse-sdk/userVars';
import { useCheckUserStatus } from '../parse-sdk/actions';
import { Container, Image, Header } from 'semantic-ui-react';
import MainNav from './MainNav';

// CSS
import '../css/home.css';

// MEDIA
import landingPageTextBg from '../media/landing-page-text-bg.png';
import phoneMockupImg from '../media/phone-mockup.png';

// Home
const Home = () => {
  // Hooks
  const [isLoggedIn] = useCheckUserStatus();

  // State values
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  // useRefs
  const absNavRef = useRef(null);
  const appDetailsContainerRef = useRef(null);

  // UseEffect for setting all state values relating to user and its status
  React.useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  // Func for setting dynamic margin top
  const setDynamicMarginTop = () => {
    setTimeout(() => {
      appDetailsContainerRef.current.style.marginTop = `${
        absNavRef.current.offsetHeight + 2
      }px`;
    }, 50);
  };
  // UseEffect for marginTop
  React.useEffect(() => {
    appDetailsContainerRef.current.style.marginTop = `${
      absNavRef.current.offsetHeight + 2
    }px`;
  }, []);
  React.useEffect(() => {
    window.addEventListener('resize', setDynamicMarginTop);
    return () => {
      window.removeEventListener('resize', setDynamicMarginTop);
    };
  });

  // VARS
  // const isMobileOnly = useMediaQuery({ query: "(max-width:768px)" });
  const isTabletandAbove = useMediaQuery({ query: '(min-width:768px)' });

  return (
    <>
      <Container fluid id='main-part-container' className='position-relative'>
        <Image
          fluid
          src={landingPageTextBg}
          className={`animate__animated animate__slideInDown animate__slow`}
          id='landing-page-text-bg'
          // style={{ boxShadow: "0 0 3px 3px black" }}
        />
        <div
          className='position-absolute d-flex flex-column'
          id='nav-and-app-details-container'
        >
          <MainNav ref={absNavRef} isMainPageNav={true} />
          <div
            className='d-flex position-relative justify-content-around user-select-none align-items-start'
            id='app-details-container'
            ref={appDetailsContainerRef}
            style={{ width: '100vw' }}
          >
            <section className='position-relative px-3 pt-4 pt-sm-5 pt-md-4 pt-lg-4 px-md-4 px-lg-5 text-left align-self-start'>
              <Header
                id='landing-page-app-caption'
                className='open-sans-font mb-0'
              >
                Organize your tasks with ease.
              </Header>
              <h3 className='mt-1 mb-2 text-whitesmoke'>
                A seamless solution to activity management.
                <br className='d-none d-lg-block' /> Get your task planning done
                with just a few clicks.
              </h3>
              <div className='d-flex pt-2 pt-md-1 pt-lg-5'>
                {!isUserLoggedIn && (
                  <>
                    <Link
                      to='/login'
                      className='d-block text-whitesmoke me-3 landing-page-main-action-link'
                    >
                      Login
                    </Link>
                    <Link
                      to='/signup'
                      className='d-block text-whitesmoke ms-3 landing-page-main-action-link'
                    >
                      Sign up
                    </Link>
                  </>
                )}
                {isUserLoggedIn && (
                  <Link
                    to='/dashboard'
                    className='d-block text-whitesmoke me-3 landing-page-main-action-link'
                  >
                    Visit Dashboard
                  </Link>
                )}
              </div>
            </section>
            {isTabletandAbove && (
              <section className='px-5 text-center'>
                <Image src={phoneMockupImg} width='100%' height='500' />
              </section>
            )}
          </div>
        </div>
      </Container>

      <Container>{isUserLoggedIn && <h1>Veracity</h1>}</Container>
    </>
  );
};

export default Home;
