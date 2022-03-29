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
  VStack,
  Heading,
  chakra,
} from '@chakra-ui/react';
import SignupForm from '../../components/signup/SignupForm';
import BackdropImage from '../../components/general/BackdropImage';
import Logo from '../../components/general/Logo';
import CustomLink from '../../components/general/CustomLink';

const SignupPage: NextPage = () => {
  // Hooks
  const userLoginState = useContext(UserLoginStateContext);
  const { encLoggedInString } = userLoginState;
  const router = useRouter();
  const { showCustomToast } = useCustomToast();
  const flexBg = useColorModeValue(
    'rgba(255,255,255,0.825)',
    'rgba(0,0,0,0.7)'
  );
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
      {/* Signup SEO Section */}
      <Head>
        <title>Sign up for a new world of task management | my-next-task</title>
        <meta
          name='description'
          content='Sign up to gain access and explore a new world of task management'
        />
      </Head>
      {/*  */}

      {/* Signup Page Component */}
      <Container
        w='100vw'
        maxW='full'
        m='0'
        p='0'
        minH='100vh'
        h='auto'
        position='relative'
        backgroundImage='/media/sun-tornado.svg'
        backgroundSize='cover'
        backgroundPosition={{ base: 'left', md: 'center' }}
      >
        <Flex
          as='section'
          height='auto'
          minH='100vh'
          w='full'
          direction='column'
          justify='center'
          align='center'
          bgColor={flexBg}
          userSelect='none'
          gap='2'
          px='4'
          backdropFilter='blur(12px)'
        >
          {/* Logo on signup page */}
          <Logo logoType='normal' />

          {/* The signup form goes in here */}

          <SignupForm {...userLoginState} />

          {/* Other links on login page */}
          <VStack mt='1'>
            <Heading as='h3' fontSize='1.1rem'>
              Already have an account?{' '}
              <chakra.span color={brandColor}>
                <CustomLink href='/login'>Log in</CustomLink>{' '}
              </chakra.span>
            </Heading>
          </VStack>
        </Flex>
      </Container>
      {/*  */}
    </>
  );
};

export default SignupPage;
