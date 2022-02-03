import { FC, createContext } from 'react';
import { useTasksLiveQuery, TaskInterface } from '../../parse-sdk/hooks';

interface TasksContextInterface {
  tasks: Array<TaskInterface> | null;
  isTasksLoading: boolean;
  isError: boolean;
  tasksError: string | null;
  triggerTasksFetch: () => void;
}

export const TasksContext = createContext<TasksContextInterface>(null);

const TasksConfig: FC = (props) => {
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
