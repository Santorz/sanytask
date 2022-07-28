import {
  Box,
  useColorModeValue,
  Image,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FC } from 'react';
import Link from 'next/link';
import { BlogPostPreviewType } from '../../../pages/blog';
import imageUrlBuilder from '@sanity/image-url';
import { nonTypedSanityClient } from '../../../sanity/sanityClient';

const TopPost: FC<{ post: BlogPostPreviewType }> = ({ post }) => {
  // Destructuring
  const { _id, mainImage, slug, estimatedReadingTime } = post;
  const image = imageUrlBuilder(nonTypedSanityClient).image(mainImage).url();

  //   Hooks
  const bgColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
  const borderColor = useColorModeValue('gray.600', 'whiteAlpha.600');

  // Main JSX
  return (
    <Link href={`/article/${_id}`} passHref>
      <ChakraLink w='full' maxW='27.5rem'>
        <Box
          as='article'
          rounded='xl'
          bgColor={bgColor}
          borderColor={borderColor}
          h='27.5rem'
          borderWidth='medium'
          w='full'
          backdropFilter='blur(50px)'
        >
          <Image
            w='90%'
            h='65%'
            mx='auto'
            mt='20px'
            rounded='xl'
            src={image}
            alt={`${slug.current} post cover image`}
          />
          <h4>{estimatedReadingTime}</h4>
        </Box>
      </ChakraLink>
    </Link>
  );
};

export default TopPost;
