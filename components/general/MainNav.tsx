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
  chakra,
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
interface MainNavInterface {
  addShadowBool: boolean;
}
const MainNav = forwardRef<HTMLDivElement, MainNavInterface>((props, ref) => {
  // Props
  const { addShadowBool } = props;

  // Hooks
  const { isMobile, isTabletOnly, isDesktopOnly, isTabletAndAbove } =
    useResponsiveSSR();
  const navBgColor = useColorModeValue(
    'rgba(247,250,252,0.7)',
    'rgba(17,17,17,0.7)'
  );
  const grayColor = useColorModeValue('gray.500', 'gray.400');
  const boxShadow = useColorModeValue(
    '0 5.84px 8.75px -1.75px rgba(0, 0, 0, 0.225),0 2px 3px -1px rgba(0, 0, 0, 0.125)',
    '0 10px 15px -3px rgba(0, 0, 0, 1),0 4px 6px -2px rgba(0, 0, 0, 0.5)'
  );
  const {
    isOpen: isMobileSubNavOpen,
    onOpen: openMobileSubNav,
    onClose: closeMobileSubNav,
  } = useDisclosure({ defaultIsOpen: false });

  // Refs
  const subNavRef = useRef<HTMLDivElement>(null);

  // Main JSX
  return (
    //   Main Nav Conatainer
    <chakra.header w='full' h='auto'>
      <Container
        userSelect='none'
        maxW='full'
        px='0'
        as='nav'
        py={{ base: '1', md: '1.5' }}
        shadow={isMobileSubNavOpen || addShadowBool ? boxShadow : 'none'}
        backdropFilter='blur(15px) saturate(180%)'
        bgColor={navBgColor}
        position='fixed'
        top='0'
        zIndex='modal'
        role='navigation'
        transition='background-color .2s ease, box-shadow .5s ease'
      >
        {/* All except mobile subNav */}
        <Flex
          ref={ref}
          w='full'
          maxW='full'
          justify='space-between'
          align='center'
          px={['2', '3', '4', '4', '8']}
        >
          {/* Logo Container for all screens and page links for desktop only*/}
          <HStack spacing={{ lg: '0.35rem', xl: '2rem' }}>
            {/* Logo */}
            <Logo logoType='normal' isSmall isResponsive />

            {/* Vertical divider */}
            {isDesktopOnly && (
              <Icon
                as={BsDashLg}
                color={grayColor}
                fontSize='2rem'
                transform='rotate(90deg)'
              />
            )}

            {/* Page links for desktop only */}
            {isDesktopOnly && (
              <NormalPageLinks
                gap={{ lg: '1.25rem', xl: '3rem' }}
                ml={{ lg: '0.75rem !important', xl: '3rem !important' }}
              />
            )}
          </HStack>
          {/* end of logo container */}

          {/* // User-entry links on desktop only */}
          {isDesktopOnly && <UserEntryPageLinks gap='1.05rem' />}

          {/* #322 => Container for login and dashboard links for tablet only  */}
          {/*  and subnav activator button for both mobile and tablet */}
          {isMobile && (
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
                    isMobileSubNavOpen
                      ? closeMobileSubNav()
                      : openMobileSubNav()
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
                  <UserEntryPageLinks
                    direction='column'
                    align='center'
                    gap='4'
                  />
                </Flex>
              )}
            </HStack>
          </Collapse>
        )}
      </Container>
    </chakra.header>
  );
});

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
  const isDarkTheme = colorMode === 'dark';

  // Main JSX
  return (
    <Flex {...props} align='center'>
      {/* Dark Mode switch */}
      <HStack spacing='3' align='center'>
        <Heading fontSize='1.3rem'>🔆</Heading>
        <Switch
          size='md'
          isChecked={isDarkTheme}
          checked={isDarkTheme}
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
        <Heading fontSize='1.3rem'>🌙</Heading>
      </HStack>

      {/* If user isn't logged in, this shows */}
      {!isUserLoggedInDecrypted && (
        <>
          <CustomLink fontWeight='bold' fontSize='inherit' href='/login' p='2'>
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
            fontSize='inherit'
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
            fontSize='inherit'
          >
            Dashboard
          </CustomLink>

          <Button
            fontSize='inherit'
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
    </Flex>
  );
};

MainNav.displayName = 'Main Nav';
export default MainNav;
