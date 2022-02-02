import { FC, createContext } from 'react';
import { useTasksLiveQuery, TaskInterface } from '../../parse-sdk/hooks';

export const TasksContext =
  createContext<{ tasks: Array<TaskInterface>; isTasksLoading: boolean }>(null);

const TasksConfig: FC = (props) => {
  const { tasks, isTasksLoading } = useTasksLiveQuery();
  const { children } = props;

  return (
    <TasksContext.Provider
      value={{ tasks: tasks, isTasksLoading: isTasksLoading }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksConfig;
