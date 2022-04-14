import { FC } from 'react';
import { Flex, useColorModeValue, Heading } from '@chakra-ui/react';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import CTALinks from './CTALinks';

const BottomCTA: FC = () => {
  // Hooks
  const { isMobile: isM } = useResponsiveSSR();
  const bgImage = useColorModeValue(
    `/media/home/bottom-cta-polygon-light-${isM ? 'mobile' : 'desktop'}.svg`,
    `/media/home/bottom-cta-polygon-dark-${isM ? 'mobile' : 'desktop'}.svg`
  );
  const grayColor = useColorModeValue('gray.600', 'gray.300');

  // Main JSX
  return (
    <Flex
      w='full'
      minH='20rem'
      mt='20'
      pt='32'
      pb='20'
      mb='12'
      bgImage={bgImage}
      backgroundRepeat='no-repeat'
      backgroundSize={{ base: 'contain' }}
      transition='background-image .2s ease'
      align='center'
      justify={'center'}
      gap='7'
      as='section'
      userSelect='none'
      direction={'column'}
    >
      <Heading as='h2' fontSize='2.7rem' textAlign='center'>
        Step into a new world of task management
      </Heading>

      <Heading
        color={grayColor}
        as='h3'
        fontSize='1.5rem'
        textAlign='center'
        fontWeight='normal'
        fontFamily={'body'}
        px='3'
      >
        Don&apos;t take our word for it, discover it yourself
      </Heading>

      {/* CTA Links */}
      <CTALinks />
    </Flex>
  );
};

export default BottomCTA;
