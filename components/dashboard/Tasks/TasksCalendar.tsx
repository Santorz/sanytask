import { FC, useContext } from 'react';
import { Heading, Box, Text, Button, Container } from '@chakra-ui/react';
import { TasksContext } from '../../general/TasksConfig';
import { decrypt } from '../../../utils/crypto-js-utils';
import { motion } from 'framer-motion';

const TasksCalendar: FC = () => {
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
    <motion.main
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ type: 'linear', duration: '.5' }}
      key='taskcalendar'
    >
      <Container
        w='full'
        maxW='full'
        as='main'
        px={['2', '3', '3', '4']}
        mt='1'
      >
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
      </Container>
    </motion.main>
  );
};

export default TasksCalendar;
