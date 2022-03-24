import { forwardRef } from 'react';
import {
  Container,
  Flex,
  HStack,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import Logo from './Logo';
import CustomLink from './CustomLink';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

//   Main Nav Component

const MainNav = forwardRef<HTMLDivElement>((props, ref) => {
  // Hooks
  const { isMobile } = useResponsiveSSR();
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Main JSX
  return (
    //   Main Nav Conatainer
    <Container
      w='full'
      maxW='full'
      as='nav'
      px={['2', '4', '4', '8']}
      py={{ base: '0.5', md: '1' }}
    >
      <Flex
        ref={ref}
        w='full'
        maxW='full'
        justify='space-between'
        align='center'
      >
        {/* */}
        <HStack>
          {/* Logo */}
          <Logo logoType='normal' isSmall isResponsive />
        </HStack>

        {isMobile ? (
          <IconButton
            border='2px solid'
            fontSize='1.4rem'
            aria-label='Show Navbar Links'
            icon={<GiHamburgerMenu />}
            borderColor={brandColor}
          />
        ) : (
          // {/* Signup , Login and Dashboard links */}
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
    </Container>
  );
});

MainNav.displayName = 'Main Nav';

export default MainNav;
