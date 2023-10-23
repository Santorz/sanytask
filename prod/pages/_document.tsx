import Document, { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';
import { chakra } from '@chakra-ui/react';

const MyDocument = () => {
  // Main JSX
  return (
    <Html lang='en' prefix='og: http://ogp.me/ns#'>
      <Head>
        <meta charSet='utf-8' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='icon' href='/favicon/favicon.ico' type='image/x-icon' />
      </Head>
      <BodyWithHooks />
    </Html>
  );
};

// Main Body JSX
const BodyWithHooks: FC = () => {
  // Hooks

  // Main JSX
  return (
    <chakra.body
      css={{
        '&::-webkit-scrollbar': {
          width: '10px',
          maxHeight: '40px',
        },
        '&::-webkit-scrollbar-track': {
          width: '12px',
          marginTop: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#b0b0b0',
          borderRadius: '30px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#707070',
        },
      }}
      // style={{ minHeight: '99vh' }}
    >
      <script
        defer
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7841386217905227'
        crossOrigin='anonymous'
      />
      <Main />
      <NextScript />
    </chakra.body>
  );
};

export default MyDocument;
