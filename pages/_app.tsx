import { ChakraProvider } from '@chakra-ui/react';
import TasksConfig from '../components/general/TasksConfig';
import customTheme from '../theme';

// CSS
import '../theme/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <TasksConfig>
        <Component {...pageProps} />
      </TasksConfig>
    </ChakraProvider>
  );
}

export default MyApp;
