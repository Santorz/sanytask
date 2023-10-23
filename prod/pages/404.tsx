import Head from 'next/head';
import { Container, Image, Heading } from '@chakra-ui/react';
import GeneralPageWrapper from '../components/general/GeneralPageWrapper';

// CSS
import styles from '../styles/pages/404-page.module.css';

const Body = () => {
  return (
    <>
      <Head>
        <title>Page not found | sanytask</title>
      </Head>

      <GeneralPageWrapper footerType='small'>
        <Container w='full' userSelect='none'>
          <Heading mt='3' size='2xl' textAlign='center' fontWeight='normal'>
            Page not found
          </Heading>
          <Image
            alt=''
            src='/media/404.svg'
            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
            onDragStart={(e: React.MouseEvent<HTMLImageElement>) =>
              e.preventDefault()
            }
            id='error-404-image'
            className={`mx-auto ${styles.error404Image}`}
            style={{ cursor: 'not-allowed' }}
          />
        </Container>
      </GeneralPageWrapper>
    </>
  );
};

export default Body;
