import { NextPage } from 'next';
import Head from 'next/head';
import AboutUsHomePage from '../../components/about-us/AboutUsPage';

const Blog: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | my-next-task</title>
        <meta
          name="description"
          content={`Get to know about  my-next-task and the awesome team behind it. `}
        />
      </Head>

      {/* Blog's Home page Component */}
      <AboutUsHomePage />
    </>
  );
};

export default Blog;
