import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
  Heading,
  Button,
  Link as ChakraLink,
  Container,
  useColorMode,
} from '@chakra-ui/react';
import DashboardNav from '../components/dashboard/DashboardNav';

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>my-next-task: Your friendly task management solution</title>
      </Head>
      <Heading size='2xl' fontWeight='normal'>
        Home Page
      </Heading>
      <Link href='/dashboard' passHref>
        <ChakraLink
          d='inline-block'
          rounded='lg'
          my='3'
          p='2'
          position='relative'
          bg='#00b2b8'
          color='white'
        >
          Dashboard
        </ChakraLink>
      </Link>{' '}
      &nbsp;&nbsp;
      <Button onClick={toggleColorMode} colorScheme='brand' shadow='base'>
        Switch Theme
      </Button>
    </>
  );
};

export default Home;
