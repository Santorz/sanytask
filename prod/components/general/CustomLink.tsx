import { FC, ReactNode } from 'react';
import { Link } from '@chakra-ui/next-js';
import { LinkProps } from '@chakra-ui/react';

export interface CustomLinkInterface extends LinkProps {
  href: string;
  children?: ReactNode;
  key?: number;
}
const CustomLink: FC<CustomLinkInterface> = (props) => {
  const { href, children, ...linkPropsObj } = { ...props };
  return (
    <Link href={href} {...linkPropsObj}>
      {children}
    </Link>
  );
};

export default CustomLink;
