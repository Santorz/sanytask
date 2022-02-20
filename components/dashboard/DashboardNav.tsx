import { useRef, FC, ReactNode, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useResponsiveSSR } from '../../utils/useResponsiveSSR';
import {
  Flex,
  useColorModeValue,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import {
  DashboardHashContext,
  FixedMobileNavHeightContext,
} from '../../pages/dashboard';
import { FaTasks, FaUser } from 'react-icons/fa';
import { ImCalendar } from 'react-icons/im';
import { IconType } from 'react-icons/lib';

const DashboardNav: FC = (props) => {
  // Hooks
  const { isMobile, isTabletAndAbove, isTabletOnly } = useResponsiveSSR();
  const { setFixedNavHeight } = useContext(FixedMobileNavHeightContext);
  const navShadow = useColorModeValue(
    '0 .2px 10px rgba(0,0,0,0.29)',
    '0 .2px 10px rgba(200,200,200,0.29)'
  );
  const bgColor = useColorModeValue('gray.50', '#111111');
  const fixedNavRef = useRef<HTMLDivElement & HTMLUListElement>(null);

  // useEffects
  useEffect(() => {
    setFixedNavHeight(fixedNavRef.current.clientHeight);
  }, [setFixedNavHeight]);

  useEffect(() => {
    const setHeight = () => {
      setFixedNavHeight(fixedNavRef.current.clientHeight);
    };
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, [setFixedNavHeight]);

  // Main JSX
  return (
    <Flex
      ref={fixedNavRef}
      justify={{ base: 'space-between', md: 'space-evenly' }}
      w='full'
      maxW={isMobile ? '100%' : isTabletOnly ? '300px' : '400px'}
      position={isMobile ? 'fixed' : 'relative'}
      bottom={isMobile ? '0' : 'unset'}
      boxShadow={navShadow}
      rounded={isTabletAndAbove ? '3xl' : 'none'}
      mx='0'
      as='ul'
      px={{ base: '4', md: '0' }}
      bgColor={{ base: bgColor, md: 'transparent' }}
    >
      <ActiveLink href='/dashboard' hash='' icon={FaTasks}>
        Tasks
      </ActiveLink>
      <ActiveLink href='/dashboard#calendar' hash='calendar' icon={ImCalendar}>
        Calendar
      </ActiveLink>
      <ActiveLink href='/dashboard#account' hash='account' icon={FaUser}>
        Account
      </ActiveLink>
    </Flex>
  );
};
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
    doesHashMatch ? 'brand.100' : 'gray.400'
  );

  useEffect(() => {
    setHash(windowHash);
  }, [setHash, windowHash]);

  // States

  return (
    <li style={{ listStyleType: 'none' }}>
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
    </li>
  );
};

DashboardNav.displayName = 'Dashboard Navbar';

export default DashboardNav;
