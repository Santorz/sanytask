import { FC, useContext, ReactNode } from 'react';
import { TasksContext } from '../../general/TasksConfig';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';
import TasksListContainer from './TasksListContainer';
import SubPage from '../../dashboard/SubPage';

interface TasksListInterface {
  height: number;
  children?: ReactNode;
  mbValue: number;
}

const TasksList: FC<TasksListInterface> = (props) => {
  // Hooks
  const tasksContextObj = useContext(TasksContext);
  const { isDesktopOnly } = useResponsiveSSR();

  // Framer motion page variant
  const variants = {
    hidden: {
      opacity: 0,
      x: isDesktopOnly ? -150 : -100,
      y: 0,
    },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: isDesktopOnly ? -150 : -100, y: 0 },
  };
  return (
    <SubPage {...props} key='taskslist' variants={variants}>
      <TasksListContainer {...tasksContextObj} />
    </SubPage>
  );
};

export default TasksList;
