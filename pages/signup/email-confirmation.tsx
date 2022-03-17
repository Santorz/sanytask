import { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../../components/general/UserLoginState';
import { useCustomToast } from '../../utils/useCustomToast';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import BackdropImage from '../../components/general/BackdropImage';
import Logo from '../../components/general/Logo';

const EmailConfirmationPage: NextPage = () => {
  // Hooks
  const userLoginState = useContext(UserLoginStateContext);
  const { encLoggedInString } = userLoginState;
  const router = useRouter();
  const { showCustomToast } = useCustomToast();
  const flexBg = useColorModeValue(
    'rgba(55,55,55,0.25)',
    'rgba(55,55,55,0.35)'
  );

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
        <title>A signup email has been sent | my-next-task</title>
        <meta name='description' content='A signup email has been sent' />
      </Head>
      {/*  */}

      {/* Signup Page Component */}
      <Container w='full' h='100vh' maxW='full' m='0' p='0' position='relative'>
        {/* Signup Form Container */}
        <Container
          w='full'
          maxW='full'
          m='0'
          p='0'
          position='relative'
          h='100vh'
        >
          <BackdropImage />
          {/* The signup form goes in here */}
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
            gap='5'
            px='4'
            backdropFilter='blur(3px)'
            mt='-7rem'
          >
            {/* Logo on signup page */}
            <Logo logoType='white' />
          </Flex>
        </Container>
        {/*  */}
      </Container>
      {/*  */}
    </>
  );
};

export default EmailConfirmationPage;
