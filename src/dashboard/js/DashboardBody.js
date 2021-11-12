import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  createContext,
} from 'react';
import {
  Grid,
  Segment,
  Header,
  Ref,
  Button,
  Placeholder,
  Icon,
} from 'semantic-ui-react';
import { Plus } from 'react-feather';
import { useMediaQuery } from 'react-responsive';
import { DarkThemeContext } from '../..';
import { TaskViewContext } from './App';
import { useLocation } from 'react-router';
// import { encrypt, decrypt } from '../../utils/crypto-js-utils';

// Components
import Navbar from './navbar';
import ListViewTasks from './Tasks_ListView';
import CalendarViewTasks from './Tasks_CalendarView';
import CreateNewTodoModal from './createNewTask';
import EditModal from './editTask';
import { TaskViewSwitcher } from './components/TaskViewSwitcher';
import { useFetchRemoteTasks } from '../../parse-sdk/actions';

// Media
import tasksFetchErrorPic from '../media/404-error-main.svg';

// Contexts
export const FreshPageLoadContext = createContext(null);

// Vars
const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};
const pathNames = [];

const DashboardBody = (props) => {
  const { subHash } = props;

  // Hooks
  const {
    tasksLoading,
    usersTasks,
    isTasksFetchErr,
    fetchErrMsg,
    updateTasks,
  } = useFetchRemoteTasks();
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);
  const { taskViewString } = useContext(TaskViewContext);
  const isTabletandAbove = useMediaQuery({ query: '(min-width:768px)' });
  const currentLocation = useLocation();

  // Refs
  const triggerCreateNewTodoModalRef = useRef(null);
  const mobileNavRef = useRef(null);
  const todosSegmentRef = useRef(null);

  // State values
  const [isFreshPageLoad, setIsFreshPageLoad] = useState(
    pathNames.indexOf('dashboard') < 0
  );

  // dynamically update tasks if isFreshPageLoad state value changes
  useEffect(() => {
    updateTasks(isFreshPageLoad);
  }, [isFreshPageLoad, updateTasks]);

  // useEffect for checking if pathName array is occupied
  useEffect(() => {
    if (pathNames.indexOf('dashboard') < 0) {
      setIsFreshPageLoad(true);
      pathNames.push(currentLocation.pathname.split('/')[1]);
    } else {
      setIsFreshPageLoad(false);
    }
  }, [currentLocation]);

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
                {usersTasks && <TaskViewSwitcher />}
              </Header>
              <Ref innerRef={todosSegmentRef}>
                <Segment
                  padded
                  inverted={isDarkTheme}
                  className='animate__animated animate__fadeIn animate__faster px-2 px-md-3 d-flex flex-column pb-0 pt-3'
                  style={{ minHeight: '350px', maxHeight: '500px' }}
                >
                  {!usersTasks && (
                    <>
                      {tasksLoading && (
                        <>
                          <h3 className='mb-1'>Loading tasks</h3>
                          <Placeholder
                            inverted={isDarkTheme}
                            fluid
                            className='my-2 rounded '
                          >
                            <Placeholder.Header />
                            <Placeholder.Line length='full'></Placeholder.Line>
                            <Placeholder.Line length='full'></Placeholder.Line>
                          </Placeholder>
                          <Placeholder
                            inverted={isDarkTheme}
                            fluid
                            className='my-2 rounded '
                          >
                            <Placeholder.Header />
                            <Placeholder.Line length='full'></Placeholder.Line>
                            <Placeholder.Line length='full'></Placeholder.Line>
                          </Placeholder>
                          <Placeholder
                            inverted={isDarkTheme}
                            fluid
                            className='my-2 rounded '
                          >
                            <Placeholder.Header />
                            <Placeholder.Line length='full'></Placeholder.Line>
                            <Placeholder.Line length='full'></Placeholder.Line>
                          </Placeholder>
                          <Placeholder
                            inverted={isDarkTheme}
                            fluid
                            className='my-2 rounded '
                          >
                            <Placeholder.Header />
                            <Placeholder.Line length='full'></Placeholder.Line>
                            <Placeholder.Line length='full'></Placeholder.Line>
                          </Placeholder>
                          <Placeholder
                            inverted={isDarkTheme}
                            fluid
                            className='my-2 rounded '
                          >
                            <Placeholder.Header />
                            <Placeholder.Line length='full'></Placeholder.Line>
                            <Placeholder.Line length='full'></Placeholder.Line>
                          </Placeholder>
                        </>
                      )}
                      {isTasksFetchErr && !tasksLoading && (
                        <div
                          style={{ userSelect: 'none' }}
                          className='mt-3 mb-2'
                        >
                          <img
                            style={{ cursor: 'not-allowed' }}
                            src={tasksFetchErrorPic}
                            alt='Error fetching tasks'
                            width='150'
                            height='150'
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <h3 className='my-2 my-red-text'>
                            Something went wrong...
                          </h3>
                          <h4 className='mt-2 mb-1'>
                            There was a problem getting your tasks.
                          </h4>
                          <h5 className='my-red-text mt-0'>{fetchErrMsg}</h5>
                          <Button
                            inverted={isDarkTheme}
                            type='button'
                            color='black'
                            onClick={() => updateTasks(isFreshPageLoad)}
                          >
                            <Icon name='refresh'></Icon>
                            Retry
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                  {/* When there's task available */}
                  {usersTasks && (
                    <>
                      {/* List view tasks */}
                      <ListViewTasks
                        taskViewString={taskViewString}
                        usersTasks={usersTasks}
                      />
                      {/* */}

                      {/* Calendar view tasks */}
                      <CalendarViewTasks
                        taskViewString={taskViewString}
                        usersTasks={usersTasks}
                      />
                      {/*  */}
                    </>
                  )}
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

          <FreshPageLoadContext.Provider value={setIsFreshPageLoad}>
            <CreateNewTodoModal />
            <EditModal />
          </FreshPageLoadContext.Provider>
        </>
      )}
    </>
  );
};

export default DashboardBody;
