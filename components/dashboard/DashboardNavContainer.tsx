import { forwardRef } from 'react';
import { Flex, Container, useColorModeValue } from '@chakra-ui/react';
import DashboardNav from './DashboardNav';
import Logo from '../general/Logo';
import DashboardSearch from './DashboardSearch';
import DarkModeSwitch from '../general/DarkModeSwitch';
import useResponsiveSSR from '../../utils/useResponsiveSSR';

//   Main Component
const NavContainer = forwardRef<HTMLDivElement>((props, ref) => {
  // Hooks
  const { isMobile, isTabletAndAbove } = useResponsiveSSR();
  const bgColor = useColorModeValue('gray.50', '#111111');

  return (
    <>
      <Flex
        ref={ref}
        py={['0', '2', '2', '2']}
        px={['2', '3', '3', '4']}
        justify='space-between'
        userSelect='none'
        role='navigation'
        as='nav'
        id='dashboard-nav-container'
        position='fixed'
        top='0'
        align='center'
        w='100% !important'
        bgColor={bgColor}
        zIndex='99'
      >
        {/* Logo with either horizontal or verical text */}
        <Logo isResponsive />
        {/* End of Logo */}
        <Container
          d='flex'
          maxW='600px'
          w={{ base: 'auto', md: 'full' }}
          justifyContent='right'
          m='0'
          alignItems='center'
          gap={{ base: '1', md: '4' }}
          px='0'
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
});

NavContainer.displayName = 'Nav Container';

export default NavContainer;
