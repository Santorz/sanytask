import { FC, useContext, useCallback, useEffect } from 'react';
import {
  Heading,
  VStack,
  Text,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { decrypt } from '../../../utils/crypto-js-utils';
import { useRouter } from 'next/router';
import { useDateFuncs } from '../../../utils/dateFuncs';
import { TasksContext } from '../../general/TasksConfig';
import {
  viewTaskModalSwipeDirectionType,
  ViewTaskModalSwipeHandlerContext,
} from '../General/TaskModalGeneric';
import TimeDiffShort from '../General/TimeDiffShort';

const ModalTaskDetails: FC = () => {
  // Hooks
  const { asPath, replace: routerReplace } = useRouter();
  const { getRelativeDate, isDateBefore, addColorOnTask } = useDateFuncs();
  const taskId = asPath.split('?taskId=')[1];
  const { tasks } = useContext(TasksContext);
  const specificTask = tasks && tasks.find((task) => task.id === taskId);
  const { setViewModalSwipeHandler } = useContext(
    ViewTaskModalSwipeHandlerContext
  );
  const brandColor = useColorModeValue('brand.500', 'brand.100');

  //   Task properties
  const { id, dueDate, title, details } = specificTask || {};

  // Funcs
  // router replace
  const goToTask = useCallback(
    (taskId: string) => {
      routerReplace(`/dashboard#view?taskId=${taskId}`);
    },
    [routerReplace]
  );

  // Swipe handler Main
  const handleSwipe = useCallback(
    () => (direction: viewTaskModalSwipeDirectionType) => {
      if (direction === 'left') {
        if (tasks.indexOf(specificTask) + 1 < tasks.length) {
          goToTask(tasks[tasks.indexOf(specificTask) + 1].id);
        }
      } else if (direction === 'right') {
        if (tasks.indexOf(specificTask) > 0) {
          goToTask(tasks[tasks.indexOf(specificTask) - 1].id);
        }
      }
    },
    [goToTask, specificTask, tasks]
  );

  // useEffects
  useEffect(() => {
    setViewModalSwipeHandler(handleSwipe);
  }, [handleSwipe, setViewModalSwipeHandler]);

  // Main JSX
  return (
    <VStack
      as='main'
      w='full'
      maxW='full'
      align='left'
      px='2'
      spacing='7'
      py='0'
    >
      {/* Title and date header */}
      <VStack
        userSelect='none'
        align='left'
        pb='2'
        spacing='0.5'
        borderBottom='1px solid'
        as='header'
      >
        {tasks && (
          <Heading fontSize='1.75rem' color={brandColor}>
            {title ? decrypt(title) : 'Task not found'}
          </Heading>
        )}
        <Heading fontSize='1.1rem' fontFamily='body' fontWeight='normal'>
          {/* hour left part */}
          <chakra.span color={addColorOnTask(new Date(dueDate))}>
            {dueDate && <TimeDiffShort dueDate={dueDate} />}
          </chakra.span>
          {/*  */}
          {/* relative date */}
          {' | '} {isDateBefore(new Date(dueDate)) && 'was '} due{' '}
          {dueDate && getRelativeDate(new Date(dueDate))}
          {/*  */}
        </Heading>
      </VStack>
      {/* End of title and  date header*/}

      {/* Main details */}
      <VStack userSelect='none' align='left' pb='3' spacing='1'>
        <Heading fontSize='1.1rem' fontFamily='body'>
          Details:
        </Heading>
        <Text fontSize='lg'>{details && decrypt(details)}</Text>
      </VStack>
    </VStack>
  );
};

export default ModalTaskDetails;
