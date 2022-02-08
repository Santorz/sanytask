import { forwardRef, FC, ReactNode, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useResponsiveSSR } from '../../utils/useResponsiveSSR';
import {
  Flex,
  useColorModeValue,
  Link as ChakraLink,
  Icon,
  Container,
} from '@chakra-ui/react';
import { DashboardHashContext } from '../../pages/dashboard';
import { FaTasks } from 'react-icons/fa';
import { ImCalendar } from 'react-icons/im';
import { IoIosSettings } from 'react-icons/io';
import { IconType } from 'react-icons/lib';

const DashboardNav = forwardRef<HTMLDivElement & HTMLUListElement>(
  (props, ref) => {
    const { isMobile, isTabletAndAbove } = useResponsiveSSR();
    const navShadow = useColorModeValue(
      '0 .2px 10px rgba(0,0,0,0.29)',
      '0 .2px 10px rgba(200,200,200,0.29)'
    );
    return (
      <Flex
        ref={ref}
        justify={{ base: 'space-between', md: 'space-evenly' }}
        w='full'
        maxW={isMobile ? '100%' : '400px'}
        position={isMobile ? 'fixed' : 'relative'}
        bottom={isMobile ? '0' : 'unset'}
        boxShadow={navShadow}
        rounded={isTabletAndAbove ? '3xl' : 'none'}
        mx='0'
        as='ul'
        px={{ base: '4', md: '0' }}
      >
        <ActiveLink href='/dashboard' hash='' icon={FaTasks}>
          Tasks
        </ActiveLink>
        <ActiveLink
          href='/dashboard#calendar'
          hash='calendar'
          icon={ImCalendar}
        >
          Calendar
        </ActiveLink>
        <ActiveLink
          href='/dashboard#settings'
          hash='settings'
          icon={IoIosSettings}
        >
          Settings
        </ActiveLink>
      </Flex>
    );
  }
);

interface ActiveLinkInterface {
  children?: ReactNode;
  href: string;
  hash: string;
  icon: IconType;
}

// Link on Dashboard Nav
const ActiveLink: FC<ActiveLinkInterface> = (props) => {
  const { children, href, hash, icon } = props;
  const { setHash } = useContext(DashboardHashContext);
  // Hooks
  const { asPath } = useRouter();
  const windowHash = asPath.indexOf('#') < 1 ? '' : asPath.split('#')[1];
  const doesHashMatch = hash === windowHash;
  const linkColor = useColorModeValue(
    doesHashMatch ? 'brand.500' : '#515965',
    doesHashMatch ? 'brand.50' : 'gray.400'
  );

  useEffect(() => {
    setHash(windowHash);
  }, [setHash, windowHash]);

  // States

  return (
    <Link href={href} passHref scroll={false}>
      <ChakraLink
        pt='2'
        color={linkColor}
        fontWeight={doesHashMatch ? 'bold' : 'normal'}
        fontFamily='Maven Pro'
        d='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        fontSize='15px'
        borderBottom={doesHashMatch ? '1px solid currentColor' : 'none'}
        mb='2'
        _hover={{ textDecoration: doesHashMatch ? 'none' : 'underline' }}
      >
        <Icon fontSize='22.5px' as={icon} />
        <h3>{children}</h3>
      </ChakraLink>
    </Link>
  );
};

DashboardNav.displayName = 'Dashboard Navbar';

export default DashboardNav;
