import { NextPage } from 'next';
import Head from 'next/head';
import BlogHomePage from '../../components/blog/BlogHomePage';

const Blog: NextPage = () => {
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
      <BlogHomePage />
    </>
  );
};

export default Blog;
