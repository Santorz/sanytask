import { FC } from 'react';
import dynamic from 'next/dynamic';
import GeneralPageWrapper from '../general/GeneralPageWrapper';

// Dynamic Component Imports
const Hero = dynamic(() => import('./Hero'));
const SubHero = dynamic(() => import('./SubHero'));
const AppFeatures = dynamic(() => import('./AppFeatures'));

// Main Page Component */
const HomePage: FC = () => {
  // Hooks

  // Main JSX
  return (
    <GeneralPageWrapper foooterType='big'>
      <Hero />
      <SubHero />
      <AppFeatures />
    </GeneralPageWrapper>
  );
};

export default HomePage;
