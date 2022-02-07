import { FC, MouseEvent } from 'react';
import { useColorMode, Image, Link as ChakraLink } from '@chakra-ui/react';
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
  const { colorMode } = useColorMode();
  return (
    <>
      {colorMode === 'light' ? (
        <DynamicImage src='/media/logo.svg' />
      ) : (
        <DynamicImage src='/media/logo-white.svg' />
      )}
    </>
  );
};

interface DynamicImageInterface {
  src: string;
}
const DynamicImage: FC<DynamicImageInterface> = ({ src }) => {
  return (
    <Image
      draggable={false}
      boxSize='5rem'
      alt='my-next-task logo'
      src={src}
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
