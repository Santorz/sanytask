import Document, { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';
import { chakra } from '@chakra-ui/react';

const MyDocument = () => {
  // Main JSX
  return (
    <Html lang='en' prefix='og: http://ogp.me/ns#'>
      <Head />
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
