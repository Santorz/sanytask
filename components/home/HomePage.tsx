import { FC } from 'react';
import dynamic from 'next/dynamic';
import GeneralPageWrapper from '../general/GeneralPageWrapper';

// Dynamic Component Imports
const Hero = dynamic(() => import('./Hero'));
const SubHero = dynamic(() => import('./SubHero'));

// Main Page Component */
const HomePage: FC = (props) => {
  // Hooks

  // Main JSX
  return (
    <GeneralPageWrapper foooterType='big'>
      <Hero />
      <SubHero />
    </GeneralPageWrapper>
  );
};

export default HomePage;
