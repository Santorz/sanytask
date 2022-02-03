import Head from 'next/head';
import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { TasksContext } from '../../components/general/TasksConfig';
import { decrypt } from '../../utils/crypto-js-utils';

const Dashboard = () => {
  // Hooks
  const { isTasksLoading, tasks, isError, tasksError, triggerTasksFetch } =
    useContext(TasksContext);

  return (
    <>
      <Head>
        <title>DashBoard | my-next-task</title>
      </Head>
      <Heading size='2xl' fontWeight='normal'>
        Dashboard
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
          <Text fontSize='lg' color='red.700'>
            {tasksError}
          </Text>
          <Button onClick={() => triggerTasksFetch()}> Retry</Button>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
