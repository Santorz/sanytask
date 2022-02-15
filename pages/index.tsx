import { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { decryptWithoutUserData } from '../utils/crypto-js-utils';
import {
  Heading,
  Button,
  Link as ChakraLink,
  useColorMode,
} from '@chakra-ui/react';
import { UserLoginStateContext } from '../components/general/UserLoginState';

const Home: NextPage = () => {
  const { encLoggedInString, invokeSignOut } = useContext(
    UserLoginStateContext
  );
  const isUserLoggedInDecrypted =
    decryptWithoutUserData(encLoggedInString) === 'true';
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>my-next-task: Your friendly task management solution</title>
      </Head>
      <Heading size='2xl' fontWeight='normal'>
        Home Page
      </Heading>
      <Link href={isUserLoggedInDecrypted ? '/dashboard' : '/login'} passHref>
        <ChakraLink
          d='inline-block'
          rounded='lg'
          my='3'
          p='2'
          position='relative'
          bg='#00b2b8'
          color='white'
        >
          {isUserLoggedInDecrypted ? 'Dashboard' : 'Log in'}
        </ChakraLink>
      </Link>{' '}
      &nbsp;&nbsp;
      <Button onClick={toggleColorMode} colorScheme='brand' shadow='base'>
        Switch Theme
      </Button>
      &nbsp;&nbsp;
      {isUserLoggedInDecrypted && (
        <Button onClick={invokeSignOut} colorScheme='red'>
          Log out
        </Button>
      )}
    </>
  );
};

export default Home;
