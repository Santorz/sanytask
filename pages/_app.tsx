import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { useCustomToast } from '../utils/useCustomToast';
import customTheme from '../theme';
import { isLocalUserPresentFunc } from '../parse-sdk/userVars';
import NProgress from 'nprogress';
import Parse from 'parse';
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from '../parse-sdk/config';

// Initialize Parse
if (!Parse.applicationId) {
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;
}

const UserLoginState = dynamic(
  () => import('../components/general/UserLoginState')
);
const TasksConfig = dynamic(() => import('../components/general/TasksConfig'));

// CSS
import '../theme/styles.css';
import '../styles/nprogress.css';
import '../styles/global.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  // Hooks
  const router = useRouter();
  const { closeAllToasts } = useCustomToast();

  // useEffects

  // useEffect to check if user is logged in before page switch
  useEffect(() => {
    const checkandPrevent = (url: string) => {
      if (
        (url.includes('login') || url.includes('register')) &&
        isLocalUserPresentFunc()
      ) {
        router.replace('/dashboard');
      }
    };
    router.events.on('beforeHistoryChange', checkandPrevent);
    router.events.on('routeChangeStart', checkandPrevent);
    router.events.on('routeChangeComplete', checkandPrevent);

    return () => {
      router.events.off('beforeHistoryChange', checkandPrevent);
      router.events.off('routeChangeStart', checkandPrevent);
      router.events.off('routeChangeComplete', checkandPrevent);
    };
  }, [router]);

  // Nprogress contoll useEffect
  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  // useEffect to close toasts on path change
  useEffect(() => {
    const removeAllToasts = () => {
      closeAllToasts();
    };
    router.events.on('routeChangeStart', removeAllToasts);
    router.events.on('routeChangeError', removeAllToasts);

    return () => {
      router.events.off('routeChangeStart', removeAllToasts);
      router.events.off('routeChangeError', removeAllToasts);
    };
  }, [closeAllToasts, router.events]);

  // Main JSX
  return (
    <>
      {/* SEO section */}
      <Head>
        <meta charSet='utf-8' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='icon' href='/favicon/favicon.ico' type='image/x-icon' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:url' content='https://my-next-task.com' />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://my-next-task.com/media/og-image.png'
        />
      </Head>

      {/* Main UI Components */}
      <ChakraProvider theme={customTheme}>
        <UserLoginState>
          <TasksConfig>
            <Container w='full' p='0' m='0' maxW='100%'>
              <Component {...pageProps} />
            </Container>
          </TasksConfig>
        </UserLoginState>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
