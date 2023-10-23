import { FC } from 'react';
import { Image } from '@chakra-ui/react';

const BackdropImage: FC = (props) => {
  return (
    //   background by SVGBackgrounds.com
    <Image
      alt='Backdrop image'
      src='/media/sun-tornado.svg'
      w='100vw'
      objectFit='cover'
      backgroundRepeat='no-repeat'
      backgroundPosition={{ base: 'left', md: 'center' }}
      zIndex='-1'
    />
  );
};

export default BackdropImage;
