import { FC } from 'react';
import CustomLink, { CustomLinkInterface } from './CustomLink';
import { useRouter } from 'next/router';
import { useColorModeValue } from '@chakra-ui/react';
import useResponsiveSSR from '../../utils/useResponsiveSSR';

interface ActiveLinkInterface extends CustomLinkInterface {
  text: string;
  href: string;
}

const ActiveLink: FC<ActiveLinkInterface> = (props) => {
  // Props
  const { href, text } = props;

  // Hooks
  const { asPath } = useRouter();
  const brandColor = useColorModeValue('brand.500', 'brand.100');
  const { isDesktopOnly } = useResponsiveSSR();

  //   Bools
  const isCurrentPath = asPath === href;

  return (
    <CustomLink
      fontWeight='semibold'
      fontFamily='heading'
      color={isCurrentPath ? brandColor : ''}
      href={href}
      fontSize='1.05rem'
      pb='1px'
      borderBottom={isCurrentPath ? '2px solid currentColor' : ''}
      alignSelf={!isDesktopOnly ? 'start' : 'center'}
      _hover={{ textDecoration: isCurrentPath ? 'none' : 'underline' }}
    >
      {text}
    </CustomLink>
  );
};

export default ActiveLink;
