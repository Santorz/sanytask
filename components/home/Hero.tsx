import { FC } from 'react';
import { Flex, Box, VStack, Heading } from '@chakra-ui/react';

import HeroAnim from './HeroAnim';
import CTALinks from './CTALinks';

const Hero: FC = () => {
  // Hooks

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
        pt={{ base: '0', sm: '2', lg: '3', xl: '5' }}
      >
        <VStack
          spacing={{ base: '5', md: '7' }}
          h='full'
          align='left'
          userSelect='none'
        >
          {/* Hero Header */}
          <Heading as='h1' fontSize='3.3rem' maxW='35rem'>
            Organize and manage your tasks with ease
          </Heading>
          {/*  */}

          {/* Short hero description text */}
          <VStack spacing='10' w='full' as='article' align='left'>
            <Heading
              as='h2'
              lineHeight='2.5rem'
              size='md'
              maxW={{ base: '22.5rem', md: '27.5rem' }}
              fontWeight='normal'
              fontFamily='body'
            >
              Get all your task planning done in one place. You&apos;ll be
              amazed there&apos;s a stress-free and reliable way to do it.
            </Heading>
          </VStack>
          {/*  */}

          {/* CTA Links */}
          <CTALinks />
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
