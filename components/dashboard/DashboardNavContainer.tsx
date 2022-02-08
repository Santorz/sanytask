import { FC } from 'react';
import {
  Flex,
  VStack,
  HStack,
  Container,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import DashboardNav from './DashboardNav';
import Logo from '../general/Logo';
import DashboardSearch from './DashboardSearch';
import DarkModeSwitch from '../general/DarkModeSwitch';
import useResponsiveSSR from '../../utils/useResponsiveSSR';

//   Main Component
const NavContainer: FC = () => {
  // Hooks
  const { isMobile, isTabletAndAbove } = useResponsiveSSR();
  const logoTextColor = useColorModeValue('brand.500', 'white');

  return (
    <>
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
        <Container
          d='flex'
          maxW='600px'
          w={{ base: 'auto', md: 'full' }}
          justifyContent='right'
          m='0'
          alignItems='center'
          gap='4'
        >
          {isTabletAndAbove && (
            <Flex
              maxW='400px'
              position={isMobile ? 'fixed' : 'relative'}
              bottom={isMobile ? '0' : 'unset'}
              rounded={isTabletAndAbove ? '3xl' : 'none'}
              mx='0'
              as='section'
              px={{ base: '4', md: '0' }}
            >
              {/* Search components for tablet and above   */}
              {isTabletAndAbove && <DashboardSearch />}
              {/* Dark mode switch for tablet and above*/}
              {isTabletAndAbove && <DarkModeSwitch />}
            </Flex>
          )}
          {/* Search components for mobile only   */}
          {isMobile && <DashboardSearch />}
          {/* Dark mode switch for tablet and above*/}
          {isMobile && <DarkModeSwitch />}
          {/* Dashboard Navbar for Tablet and above */}
          {isTabletAndAbove && <DashboardNav />}
        </Container>
      </Flex>
      {/* Fixed Dashboard Navbar for Mobile only */}
      {isMobile && <DashboardNav />}
    </>
  );
};

export default NavContainer;
