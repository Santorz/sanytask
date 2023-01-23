import React, { FC, MouseEvent } from 'react';
import {
  useColorMode,
  Image,
  Link as ChakraLink,
  VStack,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useResponsiveSSR from '../../utils/useResponsiveSSR';

interface LogoInterface {
  logoType: 'normal' | 'white';
  isResponsive?: boolean;
  isSmall?: boolean;
}
const Logo: FC<LogoInterface> = (props) => {
  const { asPath } = useRouter();

  return (
    <>
      {asPath !== '/' ? (
        <Link href='/' passHref>
          <a>
            <LogoImage {...props} />
          </a>
        </Link>
      ) : (
        <LogoImage {...props} />
      )}
    </>
  );
};

const LogoImage: FC<LogoInterface> = (props) => {
  const { logoType } = props;
  const { colorMode } = useColorMode();
  return (
    <>
      {logoType === 'normal' && colorMode === 'light' && (
        <DynamicImage src='/media/logo.svg' {...props} />
      )}
      {((colorMode === 'dark' &&
        (logoType === 'white' || logoType === 'normal')) ||
        (colorMode === 'light' && logoType === 'white')) && (
        <DynamicImage src='/media/logo-white.svg' {...props} />
      )}
    </>
  );
};

interface DynamicImageInterface extends LogoInterface {
  src: string;
}
const DynamicImage: FC<DynamicImageInterface> = (props) => {
  // Hooks
  const { isResponsive, logoType, isSmall } = props;
  const { isMobile } = useResponsiveSSR();
  const logoTextColor = useColorModeValue(
    logoType === 'normal' ? 'brand.500' : 'white',
    'gray.50'
  );
  return (
    <>
      {isMobile && isResponsive && (
        <VStack userSelect='none'>
          <MainImage {...props} />
          <Heading
            fontSize={isResponsive || isSmall ? '1rem' : 'lg'}
            mt='0 !important'
            color={logoTextColor}
          >
            sanytask
          </Heading>
        </VStack>
      )}
      {((!isMobile && isResponsive) ||
        !isResponsive ||
        (isSmall && !isResponsive)) && (
        <HStack spacing='2' userSelect='none'>
          <MainImage {...props} />
          <Heading
            fontSize={isResponsive || isSmall ? '1.2rem' : '3xl'}
            mt='0 !important'
            color={logoTextColor}
          >
            sanytask
          </Heading>
        </HStack>
      )}
    </>
  );
};

const MainImage: FC<DynamicImageInterface> = ({ src, isResponsive }) => (
  <Image
    draggable={false}
    boxSize={{
      base: isResponsive ? '3.8rem' : '3.95rem',
      md: isResponsive ? '4rem' : '4.35rem',
    }}
    alt='sanytask logo'
    src={src}
    onContextMenu={(event: MouseEvent<HTMLImageElement>) => {
      event.preventDefault();
    }}
    onDragStart={(event: MouseEvent<HTMLImageElement>) => {
      event.preventDefault();
    }}
  />
);

export default Logo;
