import Document, { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang='en'>
      <Head>
        {/* <meta httpEquiv='Content-Security-Policy' content="script-src 'none'" /> */}
        <meta charSet='utf-8' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Maven+Pro&family=Noto+Sans&display=swap`}
          rel='stylesheet'
        />
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
