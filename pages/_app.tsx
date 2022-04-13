import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { useCustomToast } from '../utils/useCustomToast';
import customTheme from '../theme';
import { isLocalUserPresentFunc } from '../parse-sdk/userVars';
import NProgress from 'nprogress';

const TasksConfig = dynamic(() => import('../components/general/TasksConfig'));
const UserLoginState = dynamic(
  () => import('../components/general/UserLoginState')
);

// CSS
import '../theme/styles.css';
import '../styles/nprogress.css';

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
    <ChakraProvider theme={customTheme}>
      <UserLoginState>
        <TasksConfig>
          <Container w='full' p='0' m='0' maxW='100%'>
            <Component {...pageProps} />
          </Container>
        </TasksConfig>
      </UserLoginState>
    </ChakraProvider>
  );
}

export default MyApp;
