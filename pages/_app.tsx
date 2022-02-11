import { ChakraProvider } from '@chakra-ui/react';
import TasksConfig from '../components/general/TasksConfig';
import UserLoginState from '../components/general/UserLoginState';
import customTheme from '../theme';
import { Container } from '@chakra-ui/react';

// CSS
import '../theme/styles.css';

function MyApp({ Component, pageProps }) {
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
