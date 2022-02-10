import { useEffect, FC } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import LoginForm from '../../components/login/LoginForm';

const LoginPage: NextPage = () => {
  const flexBg = useColorModeValue(
    'rgba(220,220,220,0.25)',
    'rgba(55,55,55,0.45)'
  );
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
            <LoginForm />
          </Flex>
        </Container>
        {/*  */}
      </Container>
      {/*  */}
    </>
  );
};

const BackdropImage: FC = (props) => {
  return (
    //   background by SVGBackgrounds.com
    <Image
      alt='login backdrop image'
      src='/media/sun-tornado.svg'
      h='inherit'
      w='inherit'
      objectFit='cover'
      backgroundRepeat='no-repeat'
      backgroundPosition={{ base: 'left', md: 'center' }}
    />
  );
};

export default LoginPage;
