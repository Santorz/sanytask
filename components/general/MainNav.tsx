import { FC, forwardRef } from 'react';
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
} from '@chakra-ui/react';
import Logo from './Logo';
import CustomLink from './CustomLink';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

//   Main Nav Component

const MainNav = forwardRef<HTMLDivElement>((props, ref) => {
  // Hooks
  const { isMobile, isTabletOnly, isDesktopOnly } = useResponsiveSSR();
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const navBgColor = useColorModeValue(
    'rgba(247,250,252,0.7)',
    'rgba(17,17,17,0.7)'
  );
  const primaryColor = useColorModeValue('black', 'gray.50');
  const { isOpen: isMobileSubNavOpen, onToggle: toggleMobileSubNav } =
    useDisclosure();

  // Main JSX
  return (
    //   Main Nav Conatainer
    <Container
      maxW='full'
      px='0'
      as='nav'
      py={{ base: '0', md: '1' }}
      shadow={isMobileSubNavOpen ? 'lg' : 'none'}
      backdropFilter='blur(15px) saturate(180%)'
      bgColor={navBgColor}
    >
      {/* All except mobile subNav */}
      <Flex
        ref={ref}
        w='full'
        maxW='full'
        justify='space-between'
        align='center'
        px={['1', '3', '8', '8']}
      >
        {/* Logo Container*/}
        <HStack spacing='10'>
          {/* Logo */}
          <Logo logoType='normal' isSmall isResponsive />
          {isDesktopOnly && <PageLinks />}
        </HStack>
        {/* end of logo container */}

        {/* Sub Nav Menu Button on Mobile */}
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

        {/* // Signup , Login and Dashboard links */}
        {isDesktopOnly && (
          <HStack spacing='3rem'>
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
          </HStack>
        )}
      </Flex>
      {/*  */}

      {/* Mobile SubNav Component */}
      {(isMobile || isTabletOnly) && isMobileSubNavOpen && (
        <SlideFade in={isMobileSubNavOpen} unmountOnExit>
          <HStack
            w='full'
            as='section'
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <VStack spacing='4' alignItems='left' px='3' py='4'>
              <PageLinks />
            </VStack>
            <Box p='40px'>Fade</Box>
          </HStack>
        </SlideFade>
      )}
    </Container>
  );
});

MainNav.displayName = 'Main Nav';

// Page Links Component
const PageLinks: FC = () => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.100');

  // Vars
  const pageLinksArray = [
    { link: '/', text: 'Home' },
    { link: '/blog', text: 'Blog' },
    { link: '/about-us', text: 'About Us' },
  ];

  // Main JSX
  return (
    <>
      {pageLinksArray.map((pageLink, index) => {
        const { link, text } = pageLink;
        return (
          <CustomLink color={brandColor} key={index} href={link}>
            {text}
          </CustomLink>
        );
      })}
    </>
  );
};

export default MainNav;
