import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import sanityClient, {
  nonTypedSanityClient,
} from '../../../sanity/sanityClient';
import GeneralPageWrapper from '../../../components/general/GeneralPageWrapper';
import Head from 'next/head';
import { Post } from '../../../sanity/exportedBlogSchema';
import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';

// Server side Action
export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}: GetServerSidePropsContext) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=600, stale-while-revalidate=660'
  );

  const articleSlug = params.slug;

  if (!articleSlug) {
    return {
      notFound: true,
    };
  }

  const articleData = await sanityClient
    .query<Post>(`*[_type == "post" && slug.current == "${articleSlug}"]`)
    .then((post) => post[0])
    .catch((err) => console.log(err));

  if (!articleData || Object.values(articleData).length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: articleData,
  };
};

// Main Component
const ArticleSlug: NextPage<Post> = (props) => {
  // Props destructuring
  const { _id, title, author, mainImage, excerpt } = props || {};

  const image = imageUrlBuilder(nonTypedSanityClient)
    .image(mainImage)
    .size(1200, 700)
    .url();

  // State values

  // UseEffects

  // Main JSX
  return (
    <>
      {/* // SEO part */}
      <Head>
        <title>{title} - Blog | my-next-task</title>
        <meta property='og:image:type' content='image/png' />
        <meta property='og:url' content='https://my-next-task.com' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={excerpt} />
        <meta
          property='og:image'
          content={
            image
            // ? image : 'https://my-next-task.com/media/og-image.png'
          }
        />
      </Head>

      {/* // Main Body */}
      <GeneralPageWrapper footerType='big'>
        <Text>{title ? title : ''}</Text>
      </GeneralPageWrapper>
    </>
  );
};

export default ArticleSlug;
