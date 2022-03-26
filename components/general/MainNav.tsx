import { FC, forwardRef, useRef } from 'react';
import {
  Container,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  IconButton,
  useDisclosure,
  SlideFade,
  Box,
  FlexProps,
  useOutsideClick,
} from '@chakra-ui/react';
import Logo from './Logo';
import CustomLink from './CustomLink';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

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
  const primaryColor = useColorModeValue('black', 'gray.50');
  const {
    isOpen: isMobileSubNavOpen,
    onToggle: toggleMobileSubNav,
    onClose: closeMobileSubNav,
  } = useDisclosure();

  // Refs
  const subNavRef = useRef<HTMLDivElement>(null);
  // Ouside-click handler for subNav
  useOutsideClick({
    ref: subNavRef,
    handler: () => closeMobileSubNav(),
  });

  // Main JSX
  return (
    //   Main Nav Conatainer
    <Container
      maxW='full'
      px='0'
      as='nav'
      py={{ base: '0', md: '1' }}
      shadow={isMobileSubNavOpen && !isTabletAndAbove ? 'lg' : 'none'}
      backdropFilter={isTabletOnly ? '' : 'blur(15px) saturate(180%)'}
      bgColor={isTabletOnly ? 'transparent' : navBgColor}
      position='fixed'
      top='0'
      zIndex='99'
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
        <HStack spacing='3rem'>
          {/* Logo */}
          <Logo logoType='normal' isSmall isResponsive />
          {/* Page links for desktop only */}
          {isDesktopOnly && (
            <NormalPageLinks
              gap={{ lg: '1.5rem', xl: '3rem' }}
              ml={{ lg: '3.75rem !important', xl: '7.5rem !important' }}
            />
          )}
        </HStack>
        {/* end of logo container */}

        {/* // Signup , Login and Dashboard links on desktop only */}
        {isDesktopOnly && <UserEntryPageLinks gap='3rem' />}

        {/* #322 => Container for login and dashboard links for tablet only  */}
        {/*  and subnav activator button for both mobile and tablet */}
        {!isDesktopOnly && (
          <HStack spacing={{ md: '2rem' }}>
            {/* // Signup , Login and Dashboard links on tablet only */}
            {isTabletOnly && <UserEntryPageLinks gap='2rem' />}

            {/* Sub Nav Menu Button on Mobile and tablet */}
            {(isMobile || isTabletOnly) && (
              <IconButton
                variant='ghost'
                fontSize='1.75rem'
                aria-label='Show Navbar Links'
                icon={isMobileSubNavOpen ? <FaTimes /> : <GiHamburgerMenu />}
                onClick={toggleMobileSubNav}
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
      {(isMobile || isTabletOnly) && isMobileSubNavOpen && (
        <SlideFade
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
          <HStack w='full' as='section' justifyContent='space-between'>
            {/* Normal page links for mobile and tablet */}
            <VStack spacing='4' alignItems='left' px='3' py='4'>
              <NormalPageLinks direction='column' gap='3' ml={{ md: '5' }} />
            </VStack>
            {isMobile && (
              <Flex direction='row' justify='center' px='7'>
                <UserEntryPageLinks direction='column' align='center' gap='2' />
              </Flex>
            )}
          </HStack>
        </SlideFade>
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
        return (
          <CustomLink fontWeight='bold' key={index} href={link}>
            {text}
          </CustomLink>
        );
      })}
    </Flex>
  );
};

// User-Entry Page Links Component
interface UserEntryLinksInterface extends FlexProps {}
const UserEntryPageLinks: FC<UserEntryLinksInterface> = (props) => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.50');

  // Main JSX
  return (
    <Flex {...props}>
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
    </Flex>
  );
};

export default MainNav;
