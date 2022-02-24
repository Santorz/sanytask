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
import TasksList from './TasksList';
import TasksGrid from './TasksGrid';
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
  const { isMobile, isTabletOnly } = useResponsiveSSR();
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
      py='2'
      px='2'
      pb={{ base: '2', md: '4', lg: '7' }}
    >
      <div>
        {isMobile ? (
          <TasksList tasksArr={slicedTasks} />
        ) : (
          <TasksGrid tasksArr={slicedTasks} />
        )}
      </div>

      {/* Pagination Controller and Create Button */}
      <Flex
        mb='4'
        w='full'
        maxW='full'
        direction={isMobile ? 'column' : 'row-reverse'}
        justify={!isMobile ? 'space-between' : 'unset'}
        gap={isMobile ? '4' : 'unset'}
        userSelect='none'
      >
        <CreateButton />
        <PaginationController size='big' {...paginationPropsObject} />
      </Flex>
    </Flex>
  );
};

export default TasksComponent;
