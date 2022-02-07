import { useContext, createContext, useState, useCallback } from 'react';
import Head from 'next/head';
import {
  Heading,
  Box,
  Button,
  Text,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { useResponsiveSSR } from '../../utils/useResponsiveSSR';
import { TasksContext } from '../../components/general/TasksConfig';
import { decrypt } from '../../utils/crypto-js-utils';

// Components' Import
import Logo from '../../components/general/Logo';
import DashboardNav from '../../components/dashboard/DashboardNav';

// Context Interfaces
interface DashboardHashContextInterface {
  setHash: (name: string) => void;
}
const dashboardContextDefaults = {
  setHash: () => {},
};

// Contexts
export const DashboardHashContext =
  createContext<DashboardHashContextInterface>(dashboardContextDefaults);

const Dashboard = () => {
  // Hooks
  const { isMobile, isTabletAndAbove } = useResponsiveSSR();
  const logoTextColor = useColorModeValue('brand.500', 'white');
  const { isTasksLoading, tasks, isError, tasksError, triggerTasksFetch } =
    useContext(TasksContext);
  const [dashboardHash, setDashboardHash] = useState('');

  const setHash = useCallback((name: string) => {
    setDashboardHash(name);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | my-next-task</title>
      </Head>

      {/* Main Dashboard Body */}
      <Container w='full' m='0' maxWidth='100%' p='0'>
        {/* Nav Container */}
        <Flex
          py='1'
          px={['2', '3', '3', '4']}
          justify='space-between'
          userSelect='none'
          role='navigation'
          as='nav'
          id='dashboard-nav-container'
          position='relative'
          align='center'
          w='100% !important'
        >
          {/* Logo with either horizontal or verical text */}
          {isMobile && (
            <VStack>
              <Logo />
              <Heading size='sm' mt='0 !important' color={logoTextColor}>
                my-next-task
              </Heading>
            </VStack>
          )}
          {!isMobile && (
            <HStack spacing='2'>
              <Logo />
              <Heading size='md' mt='0 !important' color={logoTextColor}>
                my-next-task
              </Heading>
            </HStack>
          )}
          {/* End of Logo */}
          {/* Dashboard Navbar for Tablet and above */}
          {isTabletAndAbove && (
            <DashboardHashContext.Provider value={{ setHash }}>
              <DashboardNav />
            </DashboardHashContext.Provider>
          )}
        </Flex>
        {/* End of Nav Container */}

        {/* Dashboard Navbar for Mobile only */}
        {isMobile && (
          <DashboardHashContext.Provider value={{ setHash }}>
            <DashboardNav />
          </DashboardHashContext.Provider>
        )}

        <Heading size='xl' fontWeight='normal'>
          Dashboard / &#39;{dashboardHash}&#39;
        </Heading>
        {/* This shows while loading and there's no error */}
        {isTasksLoading && !tasks && !isError && <Heading>Loading</Heading>}

        {/* This shows after loading and there's no error */}
        {!isTasksLoading &&
          !isError &&
          tasks &&
          tasks.map((task) => {
            const { id, title, dueDate } = task;
            return (
              <h1 key={id}>
                {decrypt(title)} || {new Date(dueDate).toDateString()}
              </h1>
            );
          })}

        {/* This shows if there is an error while loading*/}
        {!tasks && isError && (
          <Box>
            <Text fontSize='lg' color='red'>
              {tasksError}
            </Text>
            <Button onClick={() => triggerTasksFetch()} colorScheme='brand'>
              Retry
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
