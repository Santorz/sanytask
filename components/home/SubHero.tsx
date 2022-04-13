import { FC, useCallback, useEffect, useState } from 'react';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import {
  Flex,
  Heading,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react';
import { VscTools } from 'react-icons/vsc';

// Main Component
const SubHero: FC = () => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const grayColor = useColorModeValue('gray.600', 'gray.300');
  const { isMobile, isTabletOnly, isDesktopOnly } = useResponsiveSSR();

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
          mt='10'
          direction={{ base: 'column', md: 'row' }}
          userSelect='none'
          as='section'
          align='center'
          gap={{ base: '5', md: '2' }}
          justify='space-between'
          transition='opacity .35s ease'
        >
          {/* Sub - hero text */}
          <VStack
            spacing='4'
            alignItems='start'
            w={{ base: 'full', md: '50%' }}
          >
            <Icon boxSize='2rem' as={VscTools} color={brandColor} />
            <Heading as='h2'>Enhance your productivity</Heading>
            <Text
              as='h3'
              fontSize='lg'
              fontWeight='semibold'
              color={grayColor}
              maxW={{ base: 'full', md: '85%', lg: '25.5rem' }}
              lineHeight={'2rem'}
            >
              Get things done when, how, and where you want them - no hassles or
              strings attached. You don&apos;t have to worry about what you
              should be doing at any given time.
            </Text>
          </VStack>

          {/* Sub hero image */}
          <Image
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            alt='Productivity image'
            src='/media/productivity.svg'
            w={{ base: 'full', md: '50%', lg: '47.5%' }}
            htmlWidth={dimension}
            htmlHeight={dimension}
          />
        </Flex>
      )}
    </>
  );
};

export default SubHero;
