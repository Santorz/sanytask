import { FC, useCallback, useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  Image,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import useResponsiveSSR from '../../utils/useResponsiveSSR';

const Hero: FC = () => {
  // Hooks
  const { isMobile, isTabletOnly, isDesktopOnly } = useResponsiveSSR();
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  // State Values
  const [dimension, setDimension] = useState<number>(null);

  // Special Funcs
  const setSubHeroImgWidth = useCallback(() => {
    if (isMobile) {
      setDimension(window.innerWidth);
    } else if (isTabletOnly) {
      setDimension(window.innerWidth / 2);
    } else if (isDesktopOnly) {
      setDimension(0.4 * window.innerWidth);
    } else {
      setDimension(null);
    }
  }, [isDesktopOnly, isMobile, isTabletOnly]);

  // useEffects
  // ----------------

  // setWidth initially
  useEffect(() => {
    setSubHeroImgWidth();
  }, [setSubHeroImgWidth]);

  // set width on resize
  useEffect(() => {
    document.addEventListener('resize', setSubHeroImgWidth);
    return () => document.removeEventListener('resize', setSubHeroImgWidth);
  }, [setSubHeroImgWidth]);

  // Main JSX
  return (
    <>
      {dimension && (
        <Flex
          px={['2', '3', '4', '4', '8']}
          flexDirection={{ base: 'column', md: 'row' }}
          direction={{ base: 'column', md: 'row' }}
          as='header'
          maxW='full'
          align='start'
          pt={{ base: '4', sm: '5', lg: '8', xl: '10' }}
          gap='2rem'
          pb='2rem'
          w='full'
          userSelect='none'
          justify='space-between'
        >
          <Heading
            px='0'
            w='full'
            fontSize={{ base: '2.6rem', md: '2.8rem', lg: '3.25rem' }}
            lineHeight='1.4'
            textAlign={{ base: 'center', md: 'left' }}
            mt={{ base: '0', md: '6', lg: '12' }}
          >
            We&apos;re on a journey of redefining task management.
          </Heading>

          <Box as='section' w={{ base: 'full' }}>
            <Image
              loading='lazy'
              rounded='2xl'
              src='/media/about-us/hero1.jpg'
              alt='Task management hero image'
              onContextMenu={(e) => e.preventDefault()}
              htmlWidth={dimension}
              htmlHeight={dimension}
              mx='auto'
              filter={isDarkTheme ? 'grayscale(50%)' : 'grayscale(20%)'}
            />

            <Text fontWeight='bold' mt='2' w='full' textAlign='center'>
              Photo by{' '}
              <ChakraLink
                textDecoration='underline'
                target='_blank'
                href='https://unsplash.com/@edenconstantin0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
              >
                Eden Constantino
              </ChakraLink>{' '}
              on{' '}
              <ChakraLink
                target='_blank'
                textDecoration='underline'
                href='https://unsplash.com/s/photos/task-management?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
              >
                Unsplash
              </ChakraLink>
            </Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Hero;
