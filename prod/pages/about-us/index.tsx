import { NextPage } from 'next';
import Head from 'next/head';
import AboutUsHomePage from '../../components/about-us/AboutUsPage';

const Blog: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | sanytask</title>
        <meta
          name='description'
          content={`Get to know about  sanytask and the awesome team behind it. `}
        />
      </Head>

      {/* Blog's Home page Component */}
      <AboutUsHomePage />
    </>
  );
};

export default Blog;
