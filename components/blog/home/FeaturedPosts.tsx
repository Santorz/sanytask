import { FC } from 'react';
import { BlogPostPreviewType } from '../../../pages/blog';
import EachFeaturedPost from './EachFeaturedPost';
import { VStack } from '@chakra-ui/react';

const FeaturedPosts: FC<{ featuredPosts: BlogPostPreviewType[] }> = ({
  featuredPosts,
}) => {
  // Destructuring
  return (
    <VStack
      as='section'
      justifyContent='start'
      minH='400px'
      py='0'
      maxW='450px'
    >
      {featuredPosts &&
        featuredPosts.map((eachPost) => {
          const { _id } = eachPost;
          return <EachFeaturedPost key={_id} post={eachPost} />;
        })}
    </VStack>
  );
};
export default FeaturedPosts;
