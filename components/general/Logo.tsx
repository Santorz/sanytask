import { FC, MouseEvent } from 'react';
import { useColorModeValue, Image, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Logo: FC = () => {
  const { asPath } = useRouter();

  return (
    <>
      {asPath !== '/' ? (
        <Link href='/' passHref>
          <a>
            <LogoImage />
          </a>
        </Link>
      ) : (
        <LogoImage />
      )}
    </>
  );
};

const LogoImage: FC = () => {
  const imgPath = useColorModeValue('/media/logo.svg', '/media/logo-white.svg');
  return (
    <Image
      draggable={false}
      boxSize='5rem'
      alt='my-next-task logo'
      src={imgPath}
      onContextMenu={(event: MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
      }}
      onDragStart={(event: MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
      }}
    />
  );
};

export default Logo;
