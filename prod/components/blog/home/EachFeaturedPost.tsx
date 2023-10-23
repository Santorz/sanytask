import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPostPreviewType } from '../../../pages/blog';
import imageUrlBuilder from '@sanity/image-url';
import { nonTypedSanityClient } from '../../../sanity/sanityClient';
import {
  Heading,
  HStack,
  Skeleton,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Image, Link as ChakraLink, Text } from '@chakra-ui/react';

const EachFeaturedPost: FC<{ post: BlogPostPreviewType }> = ({ post }) => {
  // Destructring
  const {
    _id,
    mainImage,
    tags,
    estimatedReadingTime: estReadTime,
    author,
    title,
    _createdAt,
    slug,
    authorName,
    authorImage,
  } = post;

  // State Values
  const [postImageUrl, setPostImageUrl] = useState<string>(null);
  const [authorImageUrl, setAuthorImageUrl] = useState<string>(null);
  const [isPostImageLoaded, setIsPostImageLoaded] = useState(false);
  const [isAuthorImageLoaded, setIsAuthorImageLoaded] = useState(false);

  // Hooks
  const tagBgColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const tagColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.600', 'whiteAlpha.600');

  // UseEfects
  useEffect(() => {
    try {
      const image = imageUrlBuilder(nonTypedSanityClient)
        .image(mainImage)
        .size(180, 135)
        .url();
      setPostImageUrl(image);
    } catch (err) {
      setPostImageUrl(null);
    }
  }, [mainImage]);

  useEffect(() => {
    try {
      const image = imageUrlBuilder(nonTypedSanityClient)
        .image(authorImage)
        .size(40, 40)
        .url();
      setAuthorImageUrl(image);
    } catch (err) {
      setAuthorImageUrl(null);
    }
  }, [authorImage]);

  return (
    <Link href={`/blog/article/${slug?.current}`} passHref legacyBehavior>
      <ChakraLink cursor='pointer' w='full' userSelect='none'>
        <HStack
          justifyContent='left'
          w='full'
          spacing='20px'
          alignItems='stretch'
        >
          {/* Post Image */}
          <Skeleton
            w='full'
            maxW='180px'
            minH='135px'
            isLoaded={isPostImageLoaded}
            fadeDuration={3}
            rounded='lg'
          >
            <Image
              w='full'
              rounded='lg'
              src={postImageUrl}
              alt={`${title} post cover image`}
              onLoad={() => setIsPostImageLoaded(true)}
            />
          </Skeleton>

          {/* Post details */}
          <VStack spacing='10px' alignItems='start'>
            {/* Tags and estimated time to read */}
            <HStack spacing='5px'>
              {/* Tags */}
              {tags &&
                tags.slice(0, 2).map(({ label, value }) => {
                  return (
                    <>
                      <Text
                        key={label}
                        px='2'
                        rounded='xl'
                        fontSize='0.7rem'
                        bgColor={tagBgColor}
                        color={tagColor}
                        fontWeight='bold'
                        letterSpacing='.5px'
                      >
                        {value}
                      </Text>
                    </>
                  );
                })}
              {/*  */}

              {/* Est. time to read */}
              <Text fontSize='0.7rem' textAlign='left'>
                {estReadTime && estReadTime >= 1 ? `${estReadTime} min.` : ''}
              </Text>
            </HStack>
            {/*  */}

            {/* Post title */}
            <Heading as='h2' fontSize='1.1rem'>
              {title}
            </Heading>

            {/* Author Details */}
            <HStack
              spacing='7.5px'
              justifyContent='left'
              pt={{ base: '0', md: '2' }}
            >
              <Skeleton
                h='40px'
                w='40px'
                isLoaded={isAuthorImageLoaded}
                fadeDuration={3}
                rounded='full'
              >
                <Image
                  borderRadius='full'
                  src={authorImageUrl}
                  alt={`${authorName} profile pic`}
                  borderColor={borderColor}
                  border='2px solid'
                  htmlWidth='40'
                  htmlHeight='40'
                  onLoad={() => setIsAuthorImageLoaded(true)}
                />
              </Skeleton>
              <VStack spacing='2.5px' alignItems='start'>
                <Text fontWeight='semibold' fontSize={'.95rem'}>
                  {authorName}
                </Text>
                <Text fontSize={'.75rem'}>
                  {new Date(_createdAt).toDateString()}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </ChakraLink>
    </Link>
  );
};

export default EachFeaturedPost;
