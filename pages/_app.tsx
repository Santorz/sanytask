import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TasksConfig from '../components/general/TasksConfig';
import UserLoginState from '../components/general/UserLoginState';
import { isLocalUserPresentFunc } from '../parse-sdk/userVars';
import customTheme from '../theme';
import { useCustomToast } from '../utils/useCustomToast';
import { ChakraProvider, Container } from '@chakra-ui/react';

// CSS
import '../theme/styles.css';

function MyApp({ Component, pageProps }) {
  // Hooks
  const router = useRouter();
  const { closeAllToasts } = useCustomToast();

  // useEffects

  // useEffect to check if user is logged in before page switch
  useEffect(() => {
    const checkandPrevent = (url: string) => {
      if (url.includes('dashboard') && !isLocalUserPresentFunc()) {
        router.replace({
          pathname: '/',
          query: `src=dashboard&reason='isLoggedOut`,
        });
      } else if (
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
