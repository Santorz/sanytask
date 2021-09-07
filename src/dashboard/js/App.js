import React, { useRef, useEffect, useState } from 'react';
import { Grid, Segment, Header, Ref } from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';

import Navbar from './navbar';
import Todos from './to-dos';
import Profile from './Profile';
import CreateNewTodoModal from './createNewTask';
import EditModal from './editTask';

// CSS
import 'animate.css';
import '../index.css';

const App = () => {
  // Use States
  const [subHash, setSubHash] = useState('');

  // Use effect for setting subHash state value
  let currentLocation = useLocation();
  const history = useHistory();
  useEffect(() => {
    let subHash = currentLocation.hash;
    if (subHash.indexOf('#') !== -1) {
      let subHashSplit = subHash.split('#')[1];
      if (subHashSplit === 'profile' || subHashSplit === 'drafts') {
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
  // const isTabletandAbove = useMediaQuery({ query: "(min-width:768px)" });
  const mobileNavRef = useRef(null);
  const todosSegmentRef = useRef(null);

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
              className='pt-4 my-0 text-teal'
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
                  className='animate__animated animate__fadeIn animate__fast px-2 px-md-3'
                  style={{
                    backgroundColor: 'whitesmoke',
                    border: '2px solid #006976',
                    boxShadow: '0 0 7px .1px gray',
                  }}
                >
                  {/* Todos Part */}
                  <Todos />
                  {/* End of Todos Part */}
                </Segment>
              </Ref>
            </Grid.Column>
          </Grid>
        </>
      )}

      <Profile subHash={subHash}></Profile>

      <CreateNewTodoModal />
      <EditModal />
    </>
  );
};

export default App;
