import { FC } from 'react';
import { decrypt } from '../../../utils/crypto-js-utils';
import { TasksContextInterface } from '../../general/TasksConfig';
import { Text, Box, Button, HStack } from '@chakra-ui/react';
import TasksLoaderComponent from './TasksLoader';
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
  const { isMobile, isTabletAndAbove, isTabletOnly } = useResponsiveSSR();

  return (
    <>
      {/* <Heading size='lg' fontWeight='normal' as='header'>
        Welcome &#39;User&#39;
      </Heading> */}

      <HStack w='full' maxW='full'>
        {/* This shows while loading and there's no error */}
        {isTasksLoading && !tasks && !isError && (
          <>
            <TasksLoaderComponent
              number={isMobile ? 5 : isTabletOnly ? 6 : 12}
            />
          </>
        )}

        {/* This shows after loading and there's no error */}
        {!isTasksLoading &&
          !isError &&
          tasks &&
          tasks.map((task) => {
            const { id, title, dueDate } = task;
            return (
              <h1 key={id}>
                {decrypt(title)} || {new Date(dueDate).toDateString()}
              </h1>
            );
          })}

        {/* This shows if there is an error while loading*/}
        {!tasks && isError && (
          <Box>
            <Text fontSize='lg' color='red'>
              {tasksError}
            </Text>
            <Button onClick={() => triggerTasksFetch()} colorScheme='brand'>
              Retry
            </Button>
          </Box>
        )}
      </HStack>
    </>
  );
};

export default TasksListContainer;
