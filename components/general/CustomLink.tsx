import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';

interface CustomLinkInterface extends LinkProps {
  href: string;
  children?: ReactNode;
  key?: number;
}
const CustomLink: FC<CustomLinkInterface> = (props) => {
  const { href, children, ...linkPropsObj } = { ...props };
  return (
    <Link href={href} passHref>
      <ChakraLink {...linkPropsObj}>{children}</ChakraLink>
    </Link>
  );
};

export default CustomLink;
