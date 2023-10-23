import { FC, createContext, ReactNode } from 'react';
import { useTasksLiveQuery, TaskInterface } from '../../parse-sdk/hooks';

export interface TasksContextInterface {
  tasks: Array<TaskInterface> | null;
  isTasksLoading: boolean;
  isError: boolean;
  tasksError: string | null;
  triggerTasksFetch: () => void;
  children?: ReactNode;
}

export const TasksContext = createContext<TasksContextInterface>(null);

const TasksConfig: FC<{children:ReactNode}> = (props) => {
  const { tasks, isTasksLoading, isError, tasksError, triggerTasksFetch } =
    useTasksLiveQuery();
  const { children } = props;

  return (
    <TasksContext.Provider
      value={{ tasks, isTasksLoading, isError, tasksError, triggerTasksFetch }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksConfig;
