import {
  Box,
  useColorModeValue,
  Image,
  Link as ChakraLink,
  Text,
  Heading,
  VStack,
  HStack,
  Skeleton,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPostPreviewType } from '../../../pages/blog';
import imageUrlBuilder from '@sanity/image-url';
import { nonTypedSanityClient } from '../../../sanity/sanityClient';

const TopPost: FC<{ post: BlogPostPreviewType }> = ({ post }) => {
  // Destructuring
  const {
    _id,
    title,
    mainImage,
    slug,
    estimatedReadingTime: estReadTime,
    tags,
  } = post || {};

  // State values
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    try {
      const image = imageUrlBuilder(nonTypedSanityClient)
        .image(mainImage)
        .size(400, 300)
        .url();
      setImageUrl(image);
    } catch (err) {
      setImageUrl(null);
    }
  }, [mainImage]);

  //   Hooks
  const bgColor = useColorModeValue('rgb(225, 225, 225)', 'rgb(35, 35,35)');
  const tagBgColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const tagColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.600', 'whiteAlpha.600');

  // Main JSX
  return (
    <Link href={`/blog/article/${slug?.current ? slug?.current : ''}`} passHref>
      <ChakraLink
        id='topPost'
        _hover={{ textDecoration: 'none' }}
        w='full'
        maxW='27.5rem'
      >
        <Box
          as='article'
          rounded='xl'
          bgColor={bgColor}
          borderColor={borderColor}
          minH='27.5rem'
          borderWidth='medium'
          w='full'
          backdropFilter='blur(50px)'
        >
          {/* Cover Image */}
          <Skeleton
            h='282px'
            w='90%'
            mx='auto'
            maxW='390px'
            isLoaded={isImageLoaded}
            fadeDuration={3}
          >
            <Image
              id='topPost-cover-image'
              w='full'
              maxH='282px'
              maxW='390px'
              mx='auto'
              mt='20px'
              rounded='xl'
              src={imageUrl}
              objectFit='cover'
              alt={`${slug?.current} post cover image`}
              fallbackStrategy='onError'
              loading='lazy'
              fallback={
                <Heading w='full' textAlign={'center'} px='10' py='100px'>
                  Failed to load Image
                </Heading>
              }
              onLoad={() => setIsImageLoaded(true)}
            />
          </Skeleton>

          {/*  */}

          {/* Details of top post */}
          <VStack px='5%' py='5' alignItems='left' w='full' spacing='3'>
            {/*  Tags and approx read time*/}
            <HStack alignItems='baseline'>
              <Text
                px='2'
                rounded='xl'
                fontSize='0.95rem'
                bgColor={tagBgColor}
                color={tagColor}
                fontWeight='bold'
                letterSpacing='.5px'
              >
                {tags ? tags[0].value : 'Uncategorized'}
              </Text>
              <Text fontSize='0.85rem' textAlign='left'>
                {estReadTime && estReadTime >= 1
                  ? `${estReadTime} min to read`
                  : estReadTime && estReadTime < 1
                  ? 'less than a min to read'
                  : ''}
              </Text>
            </HStack>
            {/*  */}

            {/* Post title */}
            <Heading as='h2' fontSize='1.5rem'>
              {title}
            </Heading>
          </VStack>
          {/*  */}
        </Box>
      </ChakraLink>
    </Link>
  );
};

export default TopPost;
