import { FC, useContext, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { BlogPagePostsContexts } from './BlogHomePage';
import TopPost from './TopPost';

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
      px={{ base: '4', sm: '16', md: '4', lg: '12', xl: '16' }}
      py='16'
      rowGap='35px'
      justify={{ base: 'center', md: 'space-around' }}
      align='center'
    >
      <TopPost post={topPost[0]} />
    </Flex>
  );
};

export default TopandFeaturedPosts;
