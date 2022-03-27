import { FC } from 'react';
import dynamic from 'next/dynamic';
import GeneralPageWrapper from '../general/GeneralPageWrapper';

// Dynamic Component Imports
const Hero = dynamic(() => import('./Hero'));

// Main Page Component */
const HomePage: FC = (props) => {
  // Hooks

  // Main JSX
  return (
    <GeneralPageWrapper foooterType='big'>
      <Hero />
    </GeneralPageWrapper>
  );
};

export default HomePage;
