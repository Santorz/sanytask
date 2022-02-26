import { FC, ReactNode } from 'react';
import { Variants, motion } from 'framer-motion';
import { Container } from '@chakra-ui/react';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';

interface SubPageInterface {
  height: number;
  pageKey: string;
  mbValue: number;
  mainNavHeight: number;
  variants: Variants;
  children?: ReactNode;
}
const SubPage: FC<SubPageInterface> = (props) => {
  const { pageKey, variants, children, height, mbValue, mainNavHeight } = props;
  // hooks
  const { isMobile } = useResponsiveSSR();

  return (
    <motion.main
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ type: 'linear', duration: '.5' }}
      key={pageKey}
    >
      <Container
        p='0'
        minH={isMobile ? `${height + 10}px` : `${height}px`}
        h={height < 350 ? 'full' : !isMobile ? `${height}` : `${height + 10}px`}
        w='full'
        maxW='full'
        as='main'
        px={['2', '3', '3', '4']}
        mb={`${isMobile ? mbValue : 0}px`}
        mt={`${mainNavHeight}px`}
        position='relative'
      >
        {children}
      </Container>
    </motion.main>
  );
};

export default SubPage;
