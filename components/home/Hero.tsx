import { FC, useContext } from 'react';
import {
  Flex,
  Box,
  VStack,
  HStack,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { UserLoginStateContext } from '../general/UserLoginState';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import CustomLink from '../general/CustomLink';
import HeroAnim from './HeroAnim';

const Hero: FC = () => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.100');
  const inversePrimaryColor = useColorModeValue('gray.50', 'black');
  const primaryColor = useColorModeValue('black', 'gray.50');
  const { encLoggedInString } = useContext(UserLoginStateContext);
  const isUserLoggedInDecrypted =
    decryptWithoutUserData(encLoggedInString) === 'true';

  // Main JSX
  return (
    <Flex
      px={['2', '3', '4', '4', '8']}
      direction={{ base: 'column', md: 'row' }}
      as='main'
      maxW='full'
      align='start'
      pt={{ base: '4', sm: '5', lg: '8', xl: '10' }}
      gap='2rem'
      pb='2rem'
    >
      {/* Hero text */}
      <Box
        as='section'
        backgroundSize='cover'
        w='full'
        id='hero-text-container'
        pt={{ base: '0', sm: '2', lg: '6', xl: '8' }}
      >
        <VStack
          spacing={{ base: '5', md: '7' }}
          h='full'
          align='left'
          userSelect='none'
        >
          {/* Hero Header */}
          <Heading as='h1' fontSize='3rem' maxW='30rem'>
            Organize and manage your tasks with ease
          </Heading>
          {/*  */}

          {/* Short hero description text */}
          <VStack spacing='10' w='full' as='article' align='left'>
            <Heading
              as='h2'
              lineHeight='2.5rem'
              size='md'
              maxW='22.5rem'
              fontWeight='normal'
              fontFamily='body'
            >
              Get all your task planning done in one place. We offer you a
              stress-free and reliable way to do it.
            </Heading>
          </VStack>
          {/*  */}

          {/* CTA Links */}
          <HStack py='2' spacing='7'>
            {/* If user is logged in */}
            {isUserLoggedInDecrypted && (
              <CustomLink
                color={inversePrimaryColor}
                href='/dashboard'
                px='5'
                py='2.5'
                fontSize='lg'
                fontWeight='bold'
                rounded='3xl'
                bgColor={brandColor}
              >
                Visit Dashboard
              </CustomLink>
            )}

            {/* If user is logged out*/}
            {!isUserLoggedInDecrypted && (
              <>
                <CustomLink
                  color={inversePrimaryColor}
                  href='/signup'
                  px='5'
                  py='2.5'
                  fontSize='lg'
                  fontWeight='bold'
                  rounded='3xl'
                  bgColor={brandColor}
                  transition='color .2s ease'
                >
                  Get Started
                </CustomLink>
                {/*  */}
                <CustomLink
                  color={primaryColor}
                  href='/login'
                  px='5'
                  py='2.5'
                  fontSize='lg'
                  fontWeight='bold'
                  rounded='full'
                  border='2px solid'
                  borderColor={brandColor}
                >
                  Log in
                </CustomLink>
              </>
            )}
          </HStack>
          {/*  */}
        </VStack>
      </Box>
      {/* End of Hero text */}

      {/* Hero Animation */}
      <HeroAnim />
      {/* End of hero animation */}
    </Flex>
  );
};

export default Hero;
