import { NextPage } from 'next';
import Head from 'next/head';
import HomePage from '../components/home/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your friendly task management solution | my-next-task</title>
        <meta
          name='description'
          content='A personalized task management application. This app is ideal for organizing, managing and scheduling your tasks.'
        />
      </Head>

      {/* Main HomePage Component */}
      <HomePage />
    </>
  );
};

export default Home;
