import React, { useContext, useRef } from 'react';
import { Grid, Segment, Header, Ref } from 'semantic-ui-react';
import { Plus } from 'react-feather';
import { useMediaQuery } from 'react-responsive';
import { DarkThemeContext } from '../..';

import Navbar from './navbar';
import Todos from './to-dos';
import CreateNewTodoModal from './createNewTask';
import EditModal from './editTask';
import { TaskViewSwitcher } from './utils/TaskViewSwitcher';

// Vars
const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};

const DashboardBody = (props) => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);
  const isTabletandAbove = useMediaQuery({ query: '(min-width:768px)' });

  // Refs
  const triggerCreateNewTodoModalRef = useRef(null);
  const mobileNavRef = useRef(null);
  const todosSegmentRef = useRef(null);

  const { subHash } = props;
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
            <Grid.Column
              mobile={16}
              tablet={10}
              computer={7}
              largeScreen={6}
              widescreen={5}
            >
              <Header
                className='pt-3 my-0 my-teal-text d-flex justify-content-between align-items-center'
                textAlign='center'
              >
                <h3
                  className='my-0 open-sans-font'
                  style={{ fontSize: '1.5rem' }}
                >
                  Task Dashboard
                </h3>
                <TaskViewSwitcher />
              </Header>
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

          <CreateNewTodoModal />
          <EditModal />
        </>
      )}
    </>
  );
};

export default DashboardBody;
