import { FC, useContext, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, VStack } from '@chakra-ui/react';
import { TasksContext } from '../../general/TasksConfig';
import { decrypt } from '../../../utils/crypto-js-utils';
import TimeDiffShort from '../General/TimeDiffShort';
import { useDateFuncs } from '../../../utils/dateFuncs';
import { useModalFuncs } from '../../../utils/modalFuncs';
import {
  viewTaskModalSwipeDirectionType,
  ViewTaskModalSwipeHandlerContext,
} from '../General/TaskModalGeneric';

const ModalTaskDetails: FC = () => {
  // Hooks
  const { asPath, replace: routerReplace } = useRouter();
  const { getRelativeDate } = useDateFuncs();
  const taskId = asPath.split('?taskId=')[1];
  const { tasks } = useContext(TasksContext);
  const { openViewTaskModal } = useModalFuncs();
  const specificTask = tasks && tasks.find((task) => task.id === taskId);
  const { setViewModalSwipeHandler } = useContext(
    ViewTaskModalSwipeHandlerContext
  );

  //   Task properties
  const { id, dueDate, title } = specificTask || {};

  // Funcs
  const handleSwipe = useCallback(
    () => (direction: viewTaskModalSwipeDirectionType) => {
      if (direction === 'left') {
        if (tasks.indexOf(specificTask) + 1 <= tasks.length) {
          openViewTaskModal(tasks[tasks.indexOf(specificTask) + 1].id);
        }
      } else if (direction === 'right') {
        if (tasks.indexOf(specificTask) > 0) {
          openViewTaskModal(tasks[tasks.indexOf(specificTask) - 1].id);
        }
      }
    },
    [openViewTaskModal, specificTask, tasks]
  );

  // useEffects
  useEffect(() => {
    setViewModalSwipeHandler(handleSwipe);
  }, [handleSwipe, setViewModalSwipeHandler]);

  // Main JSX
  return (
    <VStack as='main' w='full' maxW='full' align='left' px='2'>
      {/* Title and date header */}
      <VStack userSelect='none' align='left'>
        {tasks && (
          <Heading fontSize='2rem'>
            {title ? decrypt(title) : 'Task not found'}
          </Heading>
        )}
        <Heading fontSize='1.025rem' fontFamily='body' fontWeight='normal'>
          {dueDate && <TimeDiffShort dueDate={dueDate} />} {'   ||  '}
          {dueDate && getRelativeDate(new Date(dueDate)).replace('at', 'by')}
        </Heading>
      </VStack>
      {/* End of title and  date header*/}
    </VStack>
  );
};

export default ModalTaskDetails;
