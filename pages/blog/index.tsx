import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import BlogHomePage from '../../components/blog/home/BlogHomePage';
import sanityClient from '../../sanity/sanityClient';
import {
  Post,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
  SanityReference,
} from '../../sanity/exportedBlogSchema';

// Types and Interfaces
export type PickedPostType = Pick<
  Post,
  'slug' | 'title' | '_id' | 'author' | 'mainImage' | 'excerpt' | '_createdAt'
>;

export interface BlogPostPreviewType extends PickedPostType {
  estimatedReadingTime: number;
  tags: Array<{ label: string; value: string }>;
  authorName: string;
  authorImage: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

// Server side Props getter
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // const query = encodeURIComponent(`*[ _type == "post" ]`);
  // const url = `${process.env.SANITY_URL}query=${query}`;
  // const data = await axios.get(url).then((response) => response);
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=1320'
  );

  // Top post
  const topPost = await sanityClient
    .query<BlogPostPreviewType>(
      `*[_type == "post" &&  "top" in categories[]->title]{
    slug,
    title,
    _id,
    author,
    mainImage,
    excerpt,
    tags,
    _createdAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "authorName": author->name,
    "authorImage": author->image
  }`
    )
    .catch((err) => {
      console.log(err);
      return false;
    });

  // Featured posts
  const featuredPosts = await sanityClient
    .query<BlogPostPreviewType>(
      `*[_type == "post" &&  "featured" in categories[]->title]{
    slug,
    title,
    _id,
    author,
    mainImage,
    excerpt,
    tags,
    _createdAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "authorName": author->name,
    "authorImage": author->image
  }`
    )
    .catch((err) => {
      console.log(err);
      return false;
    });

  // All other posts
  const allOtherPosts = await sanityClient
    .query<BlogPostPreviewType>(
      `*[_type == "post" &&  !("featured" in categories[]->title) && !("top" in categories[]->title)]{
    slug,
    title,
    _id,
    author,
    mainImage,
    excerpt,
    tags,
    _createdAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
    "authorName": author->name,
    "authorImage": author->image
  }`
    )
    .catch((err) => {
      console.log(err);
      return false;
    });

  // Check for emptiness or undefined
  try {
    if (
      (!topPost || (topPost && Array(topPost).length === 0)) &&
      (!featuredPosts ||
        (featuredPosts && Array(featuredPosts).length === 0)) &&
      (!allOtherPosts || (allOtherPosts && Array(allOtherPosts).length === 0))
    ) {
      return {
        props: {
          topPost: [],
        },
      };
    } else {
      return {
        props: {
          topPost: topPost && Array(topPost).length > 0 ? topPost : [],
          featuredPosts:
            featuredPosts && Array(featuredPosts).length > 0
              ? featuredPosts
              : [],
          allOtherPosts:
            allOtherPosts && Array(allOtherPosts).length > 0
              ? allOtherPosts
              : [],
        },
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      allOtherPosts: [],
      featuredPosts: [],
      topPost: [],
    },
  };
};

// type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
// type Props = UnwrapPromise<ReturnType<typeof getServerSideProps>>[];

export interface BlogHomePagePostsInterface {
  allOtherPosts: BlogPostPreviewType[];
  featuredPosts: BlogPostPreviewType[];
  topPost: BlogPostPreviewType;
}
const Blog: NextPage<BlogHomePagePostsInterface> = (props) => {
  // Hooks

  // Main JSX
  return (
    <>
      <Head>
        <title>Blog | my-next-task</title>
        <meta
          name='description'
          content={`Welcome to my-next-task's blog. Check out our detailed and rich aricles on how to plan, manage and utilize your time. Have a nice read. `}
        />
      </Head>

      {/* Blog's Home page Component */}
      <BlogHomePage {...props} />
    </>
  );
};

export default Blog;
