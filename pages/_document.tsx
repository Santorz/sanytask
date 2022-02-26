import Document, { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang='en'>
      <Head>
        {/* <meta httpEquiv='Content-Security-Policy' content="script-src 'none'" /> */}
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon2.ico' type='image/x-icon' />
      </Head>
      <body
      // style={{ minHeight: '99vh' }}
      >
        <script
          defer
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7841386217905227'
          crossOrigin='anonymous'
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
