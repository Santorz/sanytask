import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { TasksContext } from '../components/general/TasksConfig';
import { decrypt } from '../utils/crypto-js-utils';

const Dashboard: NextPage = (props) => {
  // Hooks
  const { isTasksLoading, tasks } = useContext(TasksContext);

  return (
    <>
      <Head>
        <title>DashBoard | my-next-task</title>
      </Head>
      <Heading size='2xl' fontWeight='normal'>
        Dashboard
      </Heading>
      {isTasksLoading && !tasks && <Heading>Loading</Heading>}
      {!isTasksLoading &&
        tasks &&
        tasks.map((task) => {
          const { id, title, dueDate } = task;
          return (
            <h1 key={id}>
              {decrypt(title)} || {new Date(dueDate).toDateString()}
            </h1>
          );
        })}
      <h1>{tasks.length}</h1>
    </>
  );
};

export default Dashboard;
