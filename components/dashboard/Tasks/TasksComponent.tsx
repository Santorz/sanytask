import { FC, ReactNode, useCallback, useState, MouseEvent } from 'react';
import { TaskInterface } from '../../../parse-sdk/hooks';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';
import { Text, Flex } from '@chakra-ui/react';
import PaginationController from './PaginationController';
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
  const [pageCount, setPageCount] = useState(
    Math.ceil(tasks.length / tasksPerPage)
  );

  // handle page change
  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLButtonElement;
      const newOffset = Number(target.value);
      setTasksOffset(newOffset);
    },
    []
  );

  // Object to pass to tasks grid and pagination controller
  const paginationPropsObject = {
    tasksPerPage,
    tasksOffset,
    handlePageChange,
    slicedTasks,
    tasksLength: tasks ? tasks.length : null,
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
      <Text>You&#39;ve got {tasks.length} tasks.</Text>
      <PaginationController size='big' {...paginationPropsObject} />
    </Flex>
  );
};

export default TasksComponent;
