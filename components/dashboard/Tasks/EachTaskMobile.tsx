import { FC, ReactNode } from 'react';
import { decrypt } from '../../../utils/crypto-js-utils';
import { TaskInterface } from '../../../parse-sdk/hooks';
import { Heading, Flex, Button, IconButton } from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';
import {
  addColorOnTask,
  checkBeforeorAfter,
  getShorthandDistanceDiff,
} from '../../../utils/dateFuncs';

interface EachTaskMobileInterface extends TaskInterface {
  children?: ReactNode;
  index: number;
}

const EachTaskMobile: FC<EachTaskMobileInterface> = (props) => {
  const { id, dueDate, title, index } = props;
  return (
    <Button
      key={id}
      height='70px'
      w='full'
      rounded='xl'
      d='flex'
      shadow='md'
      justifyContent='space-between'
      name={`Task ${index}`}
      aria-label={title}
      alignItems='center'
      flexWrap='wrap'
    >
      <Flex
        textAlign='left'
        direction='column'
        maxWidth='85%'
        width='85%'
        flexWrap='wrap'
        wrap='wrap'
        gap='1'
      >
        <Heading fontSize='.75rem' w='full' whiteSpace='normal'>
          {getShorthandDistanceDiff(new Date(dueDate), new Date())}{' '}
          {checkBeforeorAfter(new Date(dueDate), new Date())}
        </Heading>
        <Heading fontSize='1.05rem' w='full' whiteSpace='normal'>
          {decrypt(title)}
        </Heading>
      </Flex>
      <IconButton
        icon={<FaEllipsisH />}
        variant='ghost'
        aria-label={`Task ${index} options`}
      />
    </Button>
  );
};

export default EachTaskMobile;
