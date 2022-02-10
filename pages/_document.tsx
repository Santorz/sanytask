import Document, { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='A personalized task management application. This app is ideal for organizing, managing and scheduling your tasks and to-dos. It helps you organize your tasks with easea and gets your task planning done with just a few clicks.'
        />
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7841386217905227'
          crossOrigin='anonymous'
        />
        {/* Parse Validator Scripts */}
        {/* <script
          src='https://cdnjs.cloudflare.com/ajax/libs/parse/3.4.0/parse.min.js'
          integrity='sha512-OTtBZ8IqWLUjQPpVNFhgqecUlvP9zWH0NI1dLBfkYeA5Sh7ri3Uq+zMxMlVAPB3bp0OztbXGClskdKarnuUi/Q=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        /> */}
      </Head>
      <body
      // style={{ minHeight: '99vh' }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
