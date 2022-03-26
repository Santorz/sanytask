import { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../../components/general/UserLoginState';
import { useCustomToast } from '../../utils/useCustomToast';
import {
  Container,
  Flex,
  useColorModeValue,
  Heading,
  VStack,
  chakra,
} from '@chakra-ui/react';
import LoginForm from '../../components/login/LoginForm';
import BackdropImage from '../../components/general/BackdropImage';
import Logo from '../../components/general/Logo';
import CustomLink from '../../components/general/CustomLink';

const LoginPage: NextPage = () => {
  // Hooks
  const userLoginState = useContext(UserLoginStateContext);
  const { encLoggedInString } = userLoginState;
  const router = useRouter();
  const { showCustomToast } = useCustomToast();
  const flexBg = useColorModeValue('rgba(255,255,255,0.7)', 'rgba(0,0,0,0.7)');
  const brandColor = useColorModeValue('brand.600', 'brand.50');

  // useEffects
  useEffect(() => {
    const isLoggedIn =
      encLoggedInString && decryptWithoutUserData(encLoggedInString) === 'true';

    if (isLoggedIn) {
      router.replace(`/dashboard`);
    }

    // if (router.asPath.includes(`?src='dashboard'`)) {
    //   showCustomToast('info2', 'You need to log in to access the dashboard');
    // }
  }, [encLoggedInString, router, showCustomToast]);

  // Main JSX
  return (
    <>
      {/* Login SEO Section */}
      <Head>
        <title>Log in | my-next-task</title>
        <meta
          name='description'
          content='Login to view and manage your next tasks.'
        />
      </Head>
      {/*  */}

      {/* Login Page Component */}
      <Container w='full' h='100vh' maxW='full' m='0' p='0' position='relative'>
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
            gap='3'
            px='4'
            backdropFilter='blur(12px)'
            mt='-5rem'
          >
            {/* Logo on login page */}
            <Logo logoType='normal' />

            {/* The login form goes in here */}
            <LoginForm {...userLoginState} />

            {/* Other links on login page */}
            <VStack>
              <Heading as='h3' fontSize='1.1rem'>
                Don&#39;t have an account?{' '}
                <chakra.span color={brandColor}>
                  <CustomLink href='/signup'>Sign up</CustomLink>{' '}
                </chakra.span>
              </Heading>
            </VStack>
          </Flex>
        </Container>
        {/*  */}
      </Container>
      {/*  */}
    </>
  );
};

export default LoginPage;
