import { FC, useCallback, createContext } from 'react';
import dynamic from 'next/dynamic';
import GeneralPageWrapper from '../../general/GeneralPageWrapper';
import { Container, useColorModeValue } from '@chakra-ui/react';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';
import { BlogHomePagePostsInterface } from '../../../pages/blog';

// Contexts
export const BlogPagePostsContexts =
  createContext<BlogHomePagePostsInterface>(null);

// Dynamic Component Imports
const Hero = dynamic(() => import('./Hero'));
const TopandFeaturedPosts = dynamic(() => import('./TopandFeaturedPosts'));

// Main Page Component */
const BlogHomePage: FC<BlogHomePagePostsInterface> = (props) => {
  // Props

  // Hooks
  const { isMobile } = useResponsiveSSR();

  // Function to generate dynamic path for the blog's homepage background image
  const genDynPathName = useCallback((color: string, device: string) => {
    return `/media/about-us/about-page-bg-${color}-${device}.svg`;
  }, []);

  // Hooks Contd.
  const blogHomePageBg = useColorModeValue(
    isMobile
      ? genDynPathName('light', 'mobile')
      : genDynPathName('light', 'desktop'),
    isMobile
      ? genDynPathName('dark', 'mobile')
      : genDynPathName('dark', 'desktop')
  );

  // Main JSX
  return (
    <GeneralPageWrapper customBg={blogHomePageBg} footerType='big'>
      <Container
        backdropFilter='blur(30px) saturate(50%)'
        w='full'
        minH='40rem'
        maxW='full'
        px='0'
      >
        {/*  */}
        <Hero />

        <BlogPagePostsContexts.Provider value={props}>
          <TopandFeaturedPosts />
        </BlogPagePostsContexts.Provider>
        {/*  */}
      </Container>
    </GeneralPageWrapper>
  );
};

export default BlogHomePage;
