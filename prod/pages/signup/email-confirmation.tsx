import { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../../components/general/UserLoginState';
import {
  Container,
  Flex,
  useColorModeValue,
  Heading,
  Icon,
  VStack,
  Text,
} from '@chakra-ui/react';
import Logo from '../../components/general/Logo';
import { MdMailOutline } from 'react-icons/md';

const EmailConfirmationPage: NextPage = () => {
  // Hooks
  const userLoginState = useContext(UserLoginStateContext);
  const { encLoggedInString } = userLoginState;
  const router = useRouter();
  const flexBg = useColorModeValue(
    'rgba(255,255,255,0.825)',
    'rgba(0,0,0,0.7)'
  );
  const formBg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(5,5,5,0.7)');
  const userFirstName = router.asPath.split('?fName=')[1];

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
  }, [encLoggedInString, router]);

  // Main JSX
  return (
    <>
      {/* Email confirmation page SEO Section */}
      <Head>
        <title>A signup verification email has been sent | sanytask</title>
        <meta
          name='description'
          content='A signup verification email has been sent'
        />
      </Head>
      {/*  */}

      {/* Email confirmation page Page Component */}
      <Container w='full' h='100vh' maxW='full' m='0' p='0' position='relative'>
        {/* Email confirmation page Form Container */}
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
            <Logo logoType='normal' />

            <VStack
              as='main'
              minH='22rem'
              bgColor={formBg}
              backdropFilter='blur(15px) saturate(180%)'
              w='full'
              maxW='550px'
              rounded='2xl'
              shadow='md'
              px={['6', '9', '11', '14']}
              py={['4', '5', '7', '6']}
            >
              <Heading as='h1' fontSize='1.5rem' my='1' textAlign='center'>
                Hi {userFirstName ? userFirstName : ''}, a confirmation mail has
                been sent to your mailbox.
              </Heading>
              <Icon as={MdMailOutline} boxSize='9.5rem' />
              <Text fontSize='lg' textAlign='center'>
                Please click the verification link attached to the mail we sent
                to verify and gain access to your account.
              </Text>
            </VStack>
          </Flex>
        </Container>
        {/*  */}
      </Container>
      {/*  */}
    </>
  );
};

export default EmailConfirmationPage;
