import { FC, ReactNode } from 'react';
import { decrypt } from '../../../utils/crypto-js-utils';
import { TaskInterface } from '../../../parse-sdk/hooks';
import { Heading, Flex, Button, IconButton } from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';

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
    >
      <Flex
        textAlign='left'
        direction='column'
        maxWidth='70%'
        w='70%'
        flexWrap='wrap'
        wrap='wrap'
        alignItems='flex-start'
        flexShrink='1'
      >
        <Heading fontSize='.75rem' minW='0'>
          {dueDate.toString()}
        </Heading>
        <Heading fontSize='1.1rem' minW='0'>
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
