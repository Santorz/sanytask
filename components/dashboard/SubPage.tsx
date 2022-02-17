import { FC, ReactNode } from 'react';
import { Variants, motion } from 'framer-motion';
import { Flex } from '@chakra-ui/react';
import useResponsiveSSR from '../../utils/useResponsiveSSR';

interface SubPageInterface {
  height: number;
  key: string;
  mbValue: number;
  variants: Variants;
  children?: ReactNode;
}
const SubPage: FC<SubPageInterface> = (props) => {
  const { key, variants, children, height, mbValue } = props;
  // hooks
  const { isMobile } = useResponsiveSSR();

  return (
    <motion.main
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ type: 'linear', duration: '.5' }}
      key={key}
    >
      <Flex
        direction='column'
        align='center'
        justify='center'
        h={`${height}px`}
        w='full'
        maxW='full'
        as='main'
        px={['2', '3', '3', '4']}
        mb={`${isMobile ? mbValue : 0}px`}
        mt={`${mbValue}px`}
      >
        {children}
      </Flex>
    </motion.main>
  );
};

export default SubPage;
