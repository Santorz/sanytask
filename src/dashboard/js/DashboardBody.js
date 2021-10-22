import React, { useContext, useRef } from 'react';
import { Grid, Segment, Header, Ref } from 'semantic-ui-react';
import { Plus } from 'react-feather';
import { useMediaQuery } from 'react-responsive';
import { DarkThemeContext } from '../..';
import { TaskViewContext } from './App';
// import { encrypt, decrypt } from '../../utils/crypto-js-utils';

// Components
import Navbar from './navbar';
import ListViewTasks from './Tasks_ListView';
import CalendarViewTasks from './Tasks_CalendarView';
import CreateNewTodoModal from './createNewTask';
import EditModal from './editTask';
import { TaskViewSwitcher } from './components/TaskViewSwitcher';

// Vars
const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};

const DashboardBody = (props) => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);
  const { taskViewString } = useContext(TaskViewContext);
  const isTabletandAbove = useMediaQuery({ query: '(min-width:768px)' });

  // Refs
  const triggerCreateNewTodoModalRef = useRef(null);
  const mobileNavRef = useRef(null);
  const todosSegmentRef = useRef(null);

  // React.useEffect(() => {
  //   console.log(encrypt('Saint'));
  //   console.log(decrypt(encrypt('Saint')));
  // }, []);

  const { subHash } = props;
  return (
    <>
      {subHash === '' && (
        <>
          <Navbar ref={mobileNavRef} />
          {/* Todos Container */}
          <Grid
            textAlign='center'
            className='flex-column user-select-none'
            padded
            verticalAlign='middle'
            id='app-main-body'
          >
            <Grid.Column
              mobile={16}
              tablet={10}
              computer={9}
              largeScreen={6}
              widescreen={6}
            >
              <Header
                className='pt-3 my-0 my-primary-text d-flex justify-content-between align-items-center'
                textAlign='center'
              >
                <h3
                  className='my-0 open-sans-font'
                  style={{ fontSize: '1.3rem' }}
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
                  className='animate__animated animate__fadeIn animate__fast px-2 px-md-3 d-flex flex-column'
                  style={{ minHeight: '350px' }}
                >
                  {/* List view tasks */}
                  <ListViewTasks taskViewString={taskViewString} />
                  {/* */}

                  {/* Calendar view tasks */}
                  <CalendarViewTasks taskViewString={taskViewString} />
                  {/*  */}
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
