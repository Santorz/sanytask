import { FC } from 'react';
import { Image } from '@chakra-ui/react';

const BackdropImage: FC = (props) => {
  return (
    //   background by SVGBackgrounds.com
    <Image
      alt='login backdrop image'
      src='/media/sun-tornado.svg'
      h='inherit'
      w='inherit'
      objectFit='cover'
      backgroundRepeat='no-repeat'
      backgroundPosition={{ base: 'left', md: 'center' }}
    />
  );
};

export default BackdropImage;
