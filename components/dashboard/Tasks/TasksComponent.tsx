import {
  FC,
  ReactNode,
  useCallback,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import { TaskInterface } from '../../../parse-sdk/hooks';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';
import { Text, Flex, VStack } from '@chakra-ui/react';
import PaginationController from './PaginationController';
import CreateButton from './CreateButton';
import Parse from 'parse';

interface TasksComponentInterface {
  tasks: TaskInterface[];
  children?: ReactNode;
}
export interface PaginatedTasksInterface {
  tasksPerPage: number;
  tasksOffset: number;
  slicedTasks: TaskInterface[];
}

const TasksComponent: FC<TasksComponentInterface> = (props) => {
  // Props
  const { tasks } = props;
  // Hooks
  const { isMobile, isTabletOnly, isDesktopOnly } = useResponsiveSSR();
  const tasksPerPage = isMobile ? 4 : isTabletOnly ? 6 : 12;
  //   State values
  const [tasksOffset, setTasksOffset] = useState(0);
  const endOffset = tasksOffset + tasksPerPage;
  const [slicedTasks, setSlicedTasks] = useState(
    tasks.slice(tasksOffset, endOffset)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    Math.ceil(tasks.length / tasksPerPage)
  );

  // useEffects
  // useeffect to  reslice tasks anytime the main tasks change
  useEffect(() => {
    setSlicedTasks(tasks.slice(tasksOffset, endOffset));
    setPageCount(Math.ceil(tasks.length / tasksPerPage));
  }, [endOffset, tasks, tasksOffset, tasksPerPage]);

  // handle page change
  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget as HTMLButtonElement;
      const btnName = target.name;
      // const newOffset = Number(target.value);
      setTasksOffset((prev) =>
        btnName === 'prev' && currentPage > 1
          ? prev - tasksPerPage
          : btnName === 'next' && currentPage < pageCount
          ? prev + tasksPerPage
          : 0
      );
      setCurrentPage((prev) =>
        btnName === 'prev' && currentPage > 1
          ? prev - 1
          : btnName === 'next' && currentPage < pageCount
          ? prev + 1
          : 1
      );
    },
    [currentPage, pageCount, tasksPerPage]
  );

  // Object to pass to tasks grid and pagination controller
  const paginationPropsObject = {
    tasksPerPage,
    tasksOffset,
    endOffset,
    handlePageChange,
    slicedTasks,
    tasksLength: tasks ? tasks.length : null,
    currentPage,
    pageCount,
  };

  // Main JSX
  return (
    <Flex
      w='full'
      direction='column'
      justify='space-between'
      as='section'
      h='full'
      py='5'
      px='2'
    >
      <Text>Hello {Parse.User.current().get('firstName')}</Text>
      <div>
        <Text>You&#39;ve got {tasks.length} tasks.</Text>
        <Text>
          This page will show {slicedTasks.length} task
          {slicedTasks.length === 1 ? '' : 's'}.
        </Text>
      </div>

      <VStack spacing='7' mb='4'>
        <CreateButton />
        <PaginationController size='big' {...paginationPropsObject} />
      </VStack>
    </Flex>
  );
};

export default TasksComponent;
