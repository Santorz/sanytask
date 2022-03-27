import { FC } from 'react';
import {
  Flex,
  Box,
  VStack,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';

const Hero: FC = () => {
  // Hooks
  const firstBgColor = useColorModeValue(
    '/media/hero-gb-light.svg',
    '/media/hero-gb-dark.svg'
  );
  const brandColor = useColorModeValue('brand.500', 'brand.200');

  // Main JSX
  return (
    <Flex
      px={['2', '3', '4', '4', '8']}
      direction={{ base: 'column', md: 'row' }}
      as='main'
      maxW='full'
    >
      {/* Hero text */}
      <Box
        as='section'
        minH='40rem'
        backgroundSize='cover'
        w='full'
        backgroundImage={firstBgColor}
        backgroundPosition='center'
      >
        <VStack
          spacing='10'
          h='full'
          align='left'
          pt={{ base: '5', lg: '10', xl: '12' }}
          userSelect='none'
        >
          <Heading as='h1' fontSize='3rem' maxW='30rem'>
            Organize your tasks with ease
          </Heading>
        </VStack>
      </Box>

      {/* Hero Animation */}
      <Box as='section' minH='40rem' w='full'></Box>
    </Flex>
  );
};

export default Hero;
