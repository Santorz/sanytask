import { FC } from 'react';
import { TasksContextInterface } from '../../general/TasksConfig';
import { Container } from '@chakra-ui/react';
import TasksLoaderComponent from './TasksLoader';
import TasksComponent from './TasksComponent';
import ErrorNotice from '../General/ErrorNotice';
import NoTasksNotice from '../General/NoTasksNotice';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';

const TasksListContainer: FC<TasksContextInterface> = (props) => {
  const {
    tasks,
    isTasksLoading,
    isError,
    tasksError,
    triggerTasksFetch,
    children,
  } = props;
  const { isMobile, isTabletOnly } = useResponsiveSSR();

  return (
    <>
      <Container
        w='full'
        maxW='full'
        p='0'
        h='full'
        minH='full'
        pt={!tasks && isError ? '3rem' : '0'}
      >
        {/* This shows while loading and there's no error */}
        {isTasksLoading && !tasks && !isError && (
          <>
            <TasksLoaderComponent
              number={isMobile ? 5 : isTabletOnly ? 6 : 12}
            />
          </>
        )}

        {/* This shows after loading and there's no error */}
        {!isTasksLoading && !isError && tasks && tasks.length > 0 && (
          <TasksComponent tasks={tasks} />
        )}
        {!isTasksLoading && !isError && tasks && tasks.length <= 0 && (
          <NoTasksNotice />
        )}

        {/* This shows if there is an error while loading*/}
        {!tasks && isError && (
          <ErrorNotice
            tasksError={tasksError}
            triggerTasksFetch={triggerTasksFetch}
          />
        )}
      </Container>
    </>
  );
};

export default TasksListContainer;
