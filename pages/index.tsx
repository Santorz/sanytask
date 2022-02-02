import { NextPage } from 'next';
import { useContext } from 'react';
import Head from 'next/head';
import { TasksContext } from '../components/general/TasksConfig';
import { decrypt } from '../src/utils/crypto-js-utils';
import { Heading } from '@chakra-ui/react';

const Home: NextPage = () => {
  const { isTasksLoading, tasks } = useContext(TasksContext);
  return (
    <>
      <Head>
        <title>my-next-task: Your friendly task management solution</title>
      </Head>
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
    </>
  );
};

export default Home;
