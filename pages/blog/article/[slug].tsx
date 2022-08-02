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

  if (!articleData || (articleData && Object.values(articleData).length < 1)) {
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
            href: `https://my-next-task.com${asPath}`,
          },
        ]}
        title={`${title} - Blog | my-next-task`}
        description={`We are happy to announce that we're now a verified Brave publisher.`}
        openGraph={{
          url: `https://my-next-task.com${asPath}`,
          title: `${title} - Blog | my-next-task`,
          description: `${excerpt}`,
          type: 'article',
          article: {
            tags: tags.map((tag) => tag.value),
          },
          site_name: `my-next-task's blog`,
          images: [
            {
              url: imageUrl,
              alt: 'Main Og-Image',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          site: `htps://my-next-task.com${asPath}`,
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
