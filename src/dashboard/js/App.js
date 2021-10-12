import React, { useRef, useEffect, useState, useContext } from 'react';
import { Grid, Segment, Header, Ref } from 'semantic-ui-react';
import { Plus } from 'react-feather';
import { useLocation, useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { DarkThemeContext } from '../..';

import Navbar from './navbar';
import Todos from './to-dos';
import Profile from './Profile';
import CreateNewTodoModal from './createNewTask';
import EditModal from './editTask';

// CSS
import 'animate.css';
import '../index.css';

// Vars
const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};

const App = () => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  // Use States
  const [subHash, setSubHash] = useState('');

  // useEffect for redirecting to home page if user is not logged in

  // Use effect for setting subHash state value
  let currentLocation = useLocation();
  const history = useHistory();
  useEffect(() => {
    let subHash = currentLocation.hash;
    if (subHash.indexOf('#') !== -1) {
      let subHashSplit = subHash.split('#')[1];
      if (subHashSplit === 'account' || subHashSplit === 'drafts') {
        setSubHash(subHashSplit);
      } else {
        history.push({
          pathname: '/dashboard',
        });
      }
    } else {
      setSubHash('');
    }
  }, [currentLocation, subHash, history]);

  const isMobileOnly = useMediaQuery({ query: '(max-width:768px)' });
  const isTabletandAbove = useMediaQuery({ query: '(min-width:768px)' });
  const mobileNavRef = useRef(null);
  const todosSegmentRef = useRef(null);
  const triggerCreateNewTodoModalRef = useRef(null);

  // useEffect and function for adjusting margin bottom if it's mobile only
  const adjustMarginBottom = () => {
    if (document.readyState === 'complete') {
      if (mobileNavRef.current) {
        let mobileNavHeight = mobileNavRef.current.clientHeight;
        todosSegmentRef.current.style.marginBottom = `${
          mobileNavHeight + 20
        }px`;
      }
    }
  };
  useEffect(() => {
    if (isMobileOnly) {
      document.addEventListener('readystatechange', adjustMarginBottom);
    }
    return () =>
      document.removeEventListener('readystatechange', adjustMarginBottom);
  }, [isMobileOnly]);

  return (
    <>
      {subHash === '' && (
        <>
          <Navbar ref={mobileNavRef} />
          {/* Todos Container */}
          <Grid
            textAlign='center'
            className='flex-column'
            padded
            verticalAlign='middle'
            id='app-main-body'
          >
            <Header
              size='large'
              className='pt-4 my-0 my-teal-text'
              textAlign='center'
            >
              My Dashboard
            </Header>
            <Grid.Column
              mobile={16}
              tablet={10}
              computer={7}
              largeScreen={6}
              widescreen={5}
            >
              <Ref innerRef={todosSegmentRef}>
                <Segment
                  raised
                  padded
                  inverted={isDarkTheme}
                  className='animate__animated animate__fadeIn animate__fast px-2 px-md-3'
                  style={{ minHeight: '350px' }}
                >
                  {/* Todos Part */}
                  <Todos />
                  {/* End of Todos Part */}
                </Segment>
              </Ref>
            </Grid.Column>
          </Grid>

          {/* Create button for tablet and above */}
          {isTabletandAbove && (
            <button
              ref={triggerCreateNewTodoModalRef}
              className='desktop-link py-2 mx-auto my-primary-bg mt-4 d-flex flex-row align-items-center'
              id='create-button-desktop'
              onClick={() =>
                openCreateNewTodoModal(triggerCreateNewTodoModalRef)
              }
            >
              <Plus size={37} color={`${tealColorString}`} strokeWidth={2.5} />
              <h3 className='my-0'>Create</h3>
            </button>
          )}
        </>
      )}

      <Profile subHash={subHash} />

      <CreateNewTodoModal />
      <EditModal />
    </>
  );
};

export default App;
