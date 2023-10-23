import { FC, useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import { BlogPagePostsContexts } from './BlogHomePage';
import TopPost from './TopPost';
import FeaturedPosts from './FeaturedPosts';

const TopandFeaturedPosts: FC = () => {
  // Hooks
  const { topPost, featuredPosts } = useContext(BlogPagePostsContexts);

  // Main JSX
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      w='full'
      as='main'
      maxW='full'
      px={{ base: '4', sm: '12', md: '4', lg: '8', xl: '12' }}
      py='16'
      gap={{ base: '90px', md: '35px', lg: '40px', xl: '100px' }}
      justify={{ base: 'center', md: 'space-around' }}
      align='center'
    >
      <TopPost post={topPost[0]} />
      <FeaturedPosts featuredPosts={featuredPosts} />
    </Flex>
  );
};

export default TopandFeaturedPosts;
