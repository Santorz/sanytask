import { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../../components/general/UserLoginState';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import LoginForm from '../../components/login/LoginForm';
import BackdropImage from '../../components/general/BackdropImage';

const LoginPage: NextPage = () => {
  // Hooks
  const userLoginState = useContext(UserLoginStateContext);
  const { isUserLoggedIn } = userLoginState;
  const router = useRouter();
  const flexBg = useColorModeValue(
    'rgba(220,220,220,0.25)',
    'rgba(55,55,55,0.45)'
  );

  // useEffects
  useEffect(() => {
    const isLoggedIn =
      isUserLoggedIn && decryptWithoutUserData(isUserLoggedIn) === 'true';

    if (isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isUserLoggedIn, router]);

  // Main JSX
  return (
    <>
      {/* Login SEO Section */}
      <Head>
        <title>Login | my-next-task</title>
      </Head>
      {/*  */}

      {/* Login Page Component */}
      <Container w='full' maxW='full' m='0' p='0' position='relative'>
        {/* Insert Navbar here */}

        {/* Login Form Container */}
        <Container
          w='full'
          maxW='full'
          m='0'
          p='0'
          position='relative'
          h='100vh'
        >
          <BackdropImage />
          {/* The login form goes in here */}
          <Flex
            as='section'
            position='absolute'
            top='0'
            bottom='0'
            left='0'
            right='0'
            w='full'
            direction='column'
            justify='center'
            align='center'
            bgColor={flexBg}
            userSelect='none'
            gap='4'
            px='4'
            backdropFilter='blur(2px)'
          >
            <LoginForm {...userLoginState} />
          </Flex>
        </Container>
        {/*  */}
      </Container>
      {/*  */}
    </>
  );
};

export default LoginPage;
