import { FC, useCallback } from 'react';
import dynamic from 'next/dynamic';
import GeneralPageWrapper from '../general/GeneralPageWrapper';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import { Container, useColorModeValue } from '@chakra-ui/react';

// Dynamic Component Imports
const Hero = dynamic(() => import('./Hero'));

// Main Page Component */
const AboutUsHomePage: FC = (props) => {
  // Hooks
  const { isMobile } = useResponsiveSSR();

  // Function to generate dynamic path for the about page background image
  const genDynPathName = useCallback((color: string, device: string) => {
    return `/media/about-us/about-page-bg-${color}-${device}.svg`;
  }, []);

  // Hooks Contd.
  const aboutUsPageBg = useColorModeValue(
    isMobile
      ? genDynPathName('light', 'mobile')
      : genDynPathName('light', 'desktop'),
    isMobile
      ? genDynPathName('dark', 'mobile')
      : genDynPathName('dark', 'desktop')
  );

  // Main JSX
  return (
    <GeneralPageWrapper customBg={aboutUsPageBg} footerType='big'>
      <Container
        backdropFilter='blur(25px) saturate(180%)'
        w='full'
        minH='40rem'
        maxW='full'
      >
        <Hero />
      </Container>
    </GeneralPageWrapper>
  );
};

export default AboutUsHomePage;
