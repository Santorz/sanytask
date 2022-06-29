import { FC } from 'react';
import dynamic from 'next/dynamic';
import GeneralPageWrapper from '../general/GeneralPageWrapper';

// Dynamic Component Imports
const Hero = dynamic(() => import('./Hero'));

// Main Page Component */
const AboutUsHomePage: FC = (props) => {
  // Hooks

  // Main JSX
  return (
    <GeneralPageWrapper footerType="big">
      <Hero />
    </GeneralPageWrapper>
  );
};

export default AboutUsHomePage;
