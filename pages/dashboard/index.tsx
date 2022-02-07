import { createContext, useState, useCallback } from 'react';
import Head from 'next/head';
import {
  Heading,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { useResponsiveSSR } from '../../utils/useResponsiveSSR';

// Components' Import
import Logo from '../../components/general/Logo';
import DashboardNav from '../../components/dashboard/DashboardNav';
import TasksList from '../dashboard/TasksList';

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

        {/* Fixed Dashboard Navbar for Mobile only */}
        {isMobile && (
          <DashboardHashContext.Provider value={{ setHash }}>
            <DashboardNav />
          </DashboardHashContext.Provider>
        )}

        {/* Main Dashboard Body */}
        {dashboardHash === '' && <TasksList />}
      </Container>
    </>
  );
};

export default Dashboard;
