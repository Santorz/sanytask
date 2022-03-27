import { FC, forwardRef, useContext, useRef } from 'react';
import {
  Container,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Collapse,
  FlexProps,
  Icon,
  useColorMode,
  Button,
  Switch,
  Heading,
} from '@chakra-ui/react';
import Logo from './Logo';
import ActiveLink from './ActiveLink';
import CustomLink from './CustomLink';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import { FaTimes, FaPowerOff } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsDashLg } from 'react-icons/bs';
import { UserLoginStateContext } from './UserLoginState';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';

//   Main Nav Component

const MainNav = forwardRef<HTMLDivElement>((props, ref) => {
  // Hooks
  const { isMobile, isTabletOnly, isDesktopOnly, isTabletAndAbove } =
    useResponsiveSSR();
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const navBgColor = useColorModeValue(
    'rgba(247,250,252,0.75)',
    'rgba(17,17,17,0.75)'
  );
  const {
    isOpen: isMobileSubNavOpen,
    onOpen: openMobileSubNav,
    onClose: closeMobileSubNav,
  } = useDisclosure({ defaultIsOpen: false });

  // Refs
  const subNavRef = useRef<HTMLDivElement>(null);

  // // Funcs
  // const closeOnOutsideClick = useCallback(
  //   (e: Event) => {
  //     if (
  //       isMobileSubNavOpen &&
  //       e.currentTarget !== subNavRef.current &&
  //       !isDesktopOnly
  //     ) {
  //       alert('hello');
  //       closeMobileSubNav();
  //     }
  //   },
  //   [closeMobileSubNav, isDesktopOnly, isMobileSubNavOpen]
  // );

  // // useEffects
  // useEffect(() => {
  //   document.addEventListener('click', closeOnOutsideClick);
  //   return () => document.removeEventListener('click', closeOnOutsideClick);
  // }, [closeOnOutsideClick]);

  // Main JSX
  return (
    //   Main Nav Conatainer
    <Container
      userSelect='none'
      maxW='full'
      px='0'
      as='nav'
      py={{ base: '0', md: '1' }}
      shadow={isMobileSubNavOpen && !isTabletAndAbove ? 'lg' : 'none'}
      backdropFilter={isTabletOnly ? '' : 'blur(15px) saturate(180%)'}
      bgColor={isTabletOnly ? 'transparent' : navBgColor}
      position='fixed'
      top='0'
      zIndex='modal'
    >
      {/* All except mobile subNav */}
      <Flex
        ref={ref}
        w='full'
        maxW='full'
        justify='space-between'
        align='center'
        px={['2', '3', '8', '8']}
      >
        {/* Logo Container for all screens and page links for desktop only*/}
        <HStack spacing={{ lg: '1.5rem', xl: '2rem' }}>
          {/* Logo */}
          <Logo logoType='normal' isSmall isResponsive />

          {/* Vertical divider */}
          {isDesktopOnly && (
            <Icon
              as={BsDashLg}
              color={brandColor}
              fontSize='2rem'
              transform='rotate(90deg)'
            />
          )}

          {/* Page links for desktop only */}
          {isDesktopOnly && (
            <NormalPageLinks
              gap={{ lg: '1.5rem', xl: '3rem' }}
              ml={{ lg: '1.5rem !important', xl: '3rem !important' }}
            />
          )}
        </HStack>
        {/* end of logo container */}

        {/* // User-entry links on desktop only */}
        {isDesktopOnly && <UserEntryPageLinks gap='1rem' />}

        {/* #322 => Container for login and dashboard links for tablet only  */}
        {/*  and subnav activator button for both mobile and tablet */}
        {!isDesktopOnly && (
          <HStack spacing={{ md: '2rem' }}>
            {/* // Signup , Login and Dashboard links on tablet only */}
            {isTabletOnly && <UserEntryPageLinks gap='1rem' />}

            {/* Sub Nav Menu Button on Mobile and tablet */}
            {(isMobile || isTabletOnly) && (
              <IconButton
                variant='ghost'
                fontSize='1.75rem'
                aria-label='Show Navbar Links'
                icon={isMobileSubNavOpen ? <FaTimes /> : <GiHamburgerMenu />}
                onClick={() =>
                  isMobileSubNavOpen ? closeMobileSubNav() : openMobileSubNav()
                }
              />
            )}
            {/* end of subnav activator button */}
          </HStack>
        )}
        {/*  end  of #322*/}

        {/*  */}
      </Flex>
      {/*  */}

      {/* Mobile SubNav Component */}
      {(isMobile || isTabletOnly) && (
        <Collapse
          animateOpacity
          ref={subNavRef}
          in={isMobileSubNavOpen}
          unmountOnExit
          style={{
            width: isTabletOnly ? '320px' : '',
            marginLeft: isTabletOnly ? 'auto' : '',
            boxShadow: isTabletOnly
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              : '',
            backdropFilter: isTabletOnly ? 'blur(15px) saturate(180%)' : '',
          }}
        >
          <HStack
            w='full'
            as='section'
            justifyContent='space-between'
            spacing='0'
          >
            {/* Normal page links for mobile and tablet */}
            <VStack
              spacing='4'
              alignItems='left'
              px='3'
              my='4'
              borderRight={isMobile ? '1px solid' : ''}
              w='full'
            >
              <NormalPageLinks direction='column' gap='3' ml={{ md: '5' }} />
            </VStack>

            {/* User entry page links for mobile only */}
            {isMobile && (
              <Flex direction='row' justify='center' px='7' my='4' w='full'>
                <UserEntryPageLinks direction='column' align='center' gap='4' />
              </Flex>
            )}
          </HStack>
        </Collapse>
      )}
    </Container>
  );
});

MainNav.displayName = 'Main Nav';

// Normal Page Links Component
interface NormalPageLinksInterface extends FlexProps {}
const NormalPageLinks: FC<NormalPageLinksInterface> = (props) => {
  // Vars
  const pageLinksArray = [
    { link: '/', text: 'Home' },
    { link: '/blog', text: 'Blog' },
    { link: '/about-us', text: 'About Us' },
    { link: '/donate', text: 'Donate' },
  ];

  // Main JSX
  return (
    <Flex {...props}>
      {pageLinksArray.map((pageLink, index) => {
        const { link, text } = pageLink;
        return <ActiveLink text={text} key={index} href={link} />;
      })}
    </Flex>
  );
};

// User-Entry Page Links Component
interface UserEntryLinksInterface extends FlexProps {}
const UserEntryPageLinks: FC<UserEntryLinksInterface> = (props) => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.50');
  const { encLoggedInString, invokeSignOut } = useContext(
    UserLoginStateContext
  );
  const isUserLoggedInDecrypted =
    decryptWithoutUserData(encLoggedInString) === 'true';
  const { colorMode, setColorMode } = useColorMode();

  // Bools
  const isLightTheme = colorMode === 'light';

  // Main JSX
  return (
    <Flex {...props} align='center'>
      {/* If user isn't logged in, this shows */}
      {!isUserLoggedInDecrypted && (
        <>
          <CustomLink fontWeight='bold' href='/login' p='2'>
            Log in
          </CustomLink>
          <CustomLink
            fontWeight='bold'
            href='/signup'
            border='2px solid'
            px='5'
            py='2'
            rounded='3xl'
            borderColor={brandColor}
          >
            Sign up
          </CustomLink>
        </>
      )}

      {/* If user is logged in, this shows */}
      {isUserLoggedInDecrypted && (
        <>
          <CustomLink
            fontWeight='bold'
            href='/dashboard'
            border='2px solid'
            px='5'
            py='2'
            rounded='3xl'
            borderColor={brandColor}
          >
            Dashboard
          </CustomLink>

          <Button
            border='2px solid'
            variant='outline'
            rounded='3xl'
            px='5'
            py='2'
            colorScheme='red'
            onClick={invokeSignOut}
          >
            Log out &nbsp; <Icon as={FaPowerOff} />
          </Button>
        </>
      )}

      {/* Dark Mode switch */}
      <HStack spacing='3'>
        <Heading fontSize='1.2rem'>🔆</Heading>
        <Switch
          aria-label={`Activate ${isLightTheme ? 'dark' : 'light'} mode`}
          onChange={(e) => {
            if (e.target.checked) {
              setColorMode('dark');
            } else {
              setColorMode('light');
            }
          }}
          colorScheme='brand'
        />
        <Heading fontSize='1.2rem'>🌙</Heading>
      </HStack>
    </Flex>
  );
};

export default MainNav;
