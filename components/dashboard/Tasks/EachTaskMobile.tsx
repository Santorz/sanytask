import { FC, ReactNode } from 'react';
import { decrypt } from '../../../utils/crypto-js-utils';
import { TaskInterface } from '../../../parse-sdk/hooks';
import { Heading, Flex, Button, chakra } from '@chakra-ui/react';
import TaskOptions from './TaskOptions';
import { useDateFuncs } from '../../../utils/dateFuncs';
import { useModalFuncs } from '../../../utils/modalFuncs';

interface EachTaskMobileInterface extends TaskInterface {
  children?: ReactNode;
  index: number;
}

const EachTaskMobile: FC<EachTaskMobileInterface> = (props) => {
  const { id, dueDate, title, index } = props;

  // Hooks
  const { getShorthandDistanceDiff, checkBeforeorAfter, addColorOnTask } =
    useDateFuncs();
  const { openViewTaskModal } = useModalFuncs();

  // Main JSX
  return (
    <Button
      as={chakra.div}
      onClick={() => openViewTaskModal(id)}
      key={id}
      height='70px'
      w='full'
      rounded='xl'
      d='flex'
      shadow='md'
      justifyContent='space-between'
      name={`Task ${index + 1}`}
      aria-label={decrypt(title)}
      alignItems='center'
      flexWrap='wrap'
      id={`task-${id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === 'Enter' || e.code === 'Space') openViewTaskModal(id);
      }}
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
        <Heading
          fontSize='.79rem'
          w='full'
          whiteSpace='normal'
          color={addColorOnTask(new Date(dueDate))}
        >
          {getShorthandDistanceDiff(new Date(dueDate))}{' '}
          {checkBeforeorAfter(new Date(dueDate))}
        </Heading>
        <Heading fontSize='1.05rem' w='full' whiteSpace='normal'>
          {decrypt(title)}
        </Heading>
      </Flex>
      <TaskOptions index={index} id={id} />
    </Button>
  );
};

export default EachTaskMobile;
