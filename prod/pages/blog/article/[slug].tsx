import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import sanityClient, {
  nonTypedSanityClient,
} from '../../../sanity/sanityClient';
import GeneralPageWrapper from '../../../components/general/GeneralPageWrapper';
import { Post } from '../../../sanity/exportedBlogSchema';
import { Text } from '@chakra-ui/react';
import imageUrlBuilder from '@sanity/image-url';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { findBestMatch } from 'string-similarity';

// Server side Action
export const getServerSideProps: GetServerSideProps = async ({
  res,
  params,
}: GetServerSidePropsContext) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=1320'
  );

  const articleSlug = params.slug as string;

  if (!articleSlug) {
    return {
      notFound: true,
    };
  }

  const articleDataOrStatus = await sanityClient
    .query<Post>(`*[_type == "post" && slug.current == "${articleSlug}"]`)
    .then((post) => {
      if (post.length <= 0 || !post) {
        throw new Error('No maching post');
      } else {
        return post[0];
      }
    })
    .catch(async (err) => {
      const allPostsSlugsAndIDs: Array<Pick<Post, '_id' | 'slug'>> =
        await sanityClient.query(`*[_type == 'post']{_id, slug}`);
      const allSlugs = allPostsSlugsAndIDs.map((post) => post.slug.current);
      const closestMatch = findBestMatch(articleSlug, allSlugs);
      const bestMatchRating = closestMatch.bestMatch.rating;
      const bestMatchSlug = closestMatch.bestMatch.target;

      // const closestPostData = await sanityClient
      //   .query<Post>(
      //     `*[_type == "post" && slug.current == "${closestMatch.bestMatch.target}"]`
      //   )
      //   .then((post) => post[0]);
      const returnObj = bestMatchRating > 0.5 ? bestMatchSlug : false;

      return returnObj;
    });

  if (typeof articleDataOrStatus == 'boolean') {
    return {
      notFound: true,
    };
  } else if (typeof articleDataOrStatus == 'string') {
    return {
      redirect: {
        destination: `/blog/article/${articleDataOrStatus}`,
        permanent: false,
      },
    };
  }

  return { props: { ...articleDataOrStatus } };
};

// Main Component
const ArticleSlug: NextPage<Post> = (props) => {
  // Props destructuring
  const { _id, title, author, mainImage, excerpt, tags } = props || {};

  const imageUrl = imageUrlBuilder(nonTypedSanityClient)
    .image(mainImage)
    .size(1200, 630)
    .url();

  // Hooks
  const { asPath } = useRouter();

  // State values

  // UseEffects

  // Main JSX
  return (
    <>
      {/* // SEO part */}
      <NextSeo
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: `https://sanytask.com${asPath}`,
          },
        ]}
        title={`${title} - Blog | sanytask`}
        description={`We are happy to announce that we're now a verified Brave publisher.`}
        openGraph={{
          url: `https://sanytask.com${asPath}`,
          title: `${title} - Blog | sanytask`,
          description: `${excerpt}`,
          type: 'article',
          article: {
            tags: tags.map((tag) => tag.value),
          },
          site_name: `sanytask's blog`,
          images: [
            {
              url: imageUrl,
              alt: 'Main Og-Image',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          site: `htps://sanytask.com${asPath}`,
          cardType: 'summary_large_image',
        }}
      />

      {/* // Main Body */}
      <GeneralPageWrapper footerType='big'>
        <Text>{title ? title : ''}</Text>
      </GeneralPageWrapper>
    </>
  );
};

export default ArticleSlug;
