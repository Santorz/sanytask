import { FC, useContext, ReactNode } from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';
import { TasksContext } from '../../general/TasksConfig';
import { SubPageInterface } from '../../../pages/dashboard';
import { decrypt } from '../../../utils/crypto-js-utils';
import SubPage from '../general/SubPage';

interface TaskCalendarInterface extends SubPageInterface {
  height: number;
  children?: ReactNode;
}

const TasksCalendar: FC<TaskCalendarInterface> = (props) => {
  // Hooks
  const { isTasksLoading, tasks, isError, tasksError, triggerTasksFetch } =
    useContext(TasksContext);
  // Framer motion page variant
  const variants = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };
  return (
    <SubPage {...props} pageKey='taskscalendar' variants={variants}>
      <Heading size='lg' fontWeight='normal'>
        Tasks Calendar
      </Heading>
      {/* This shows while loading and there's no error */}
      {isTasksLoading && !tasks && !isError && <Heading>Loading</Heading>}

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
    </SubPage>
  );
};

export default TasksCalendar;
