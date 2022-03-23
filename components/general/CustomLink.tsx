import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

interface CustomLinkInterface {
  href: string;
  children?: ReactNode;
}
const CustomLink: FC<CustomLinkInterface> = (props) => {
  const { href, children } = props;
  return (
    <Link href={href} passHref>
      <ChakraLink>{children}</ChakraLink>
    </Link>
  );
};

export default CustomLink;
