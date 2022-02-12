import { useEffect, useState, useCallback, useContext } from 'react';
import Parse from 'parse';
import { orderBy } from 'lodash';
import { decryptWithoutUserData } from '../utils/crypto-js-utils';
import { UserLoginStateContext } from '../components/general/UserLoginState';
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from './config';

// Initialize Parse
if (!Parse.applicationId) {
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;
  Parse.liveQueryServerURL = 'wss://my-next-task.b4a.io';
}

export interface TaskInterface {
  id: string;
  createdAt: Date;
  details: string;
  dueDate: string;
  title: string;
}

// Hook to get liveQuery Tasks
export const useTasksLiveQuery = () => {
  // Hooks
  const { isUserLoggedIn } = useContext(UserLoginStateContext);

  // States
  const [tasks, setTasks] = useState<Array<TaskInterface>>(null);
  const [isTasksLoading, setIsTasksLoading] = useState<boolean>(true);
  const [tasksSubscription, setTasksSubscription] =
    useState<Parse.LiveQuerySubscription>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [tasksError, setTasksError] = useState<string>(null);

  // Vars

  // Normal functions
  const showUserIsNotLoggedIn = () => {
    setTasks(null);
    setIsTasksLoading(false);
    setIsError(true);
    setTasksError('User is not logged in');
  };

  const triggerTasksFetch = useCallback(() => {
    if (decryptWithoutUserData(isUserLoggedIn) !== 'true') {
      showUserIsNotLoggedIn();
    } else if (decryptWithoutUserData(isUserLoggedIn) === 'true') {
      setIsTasksLoading(true);
      setIsError(false);
      setTasksError(null);
      setTasks(null);
      // Start fecthing process
      const tasksQuery = new Parse.Query('Task');
      tasksQuery
        .equalTo('user', Parse.User.current())
        .find()
        .then((tasksArray: Parse.Object<Parse.Attributes>[]) => {
          let tasks = tasksArray.map((t: Parse.Object<TaskInterface>) =>
            (({ id, attributes }) => ({ id, ...attributes }))(t)
          );
          const sortedTasks: Array<TaskInterface> = orderBy(
            tasks,
            ['dueDate'],
            'asc'
          );
          setTasks(sortedTasks);
          setIsError(false);
          setTasksError(null);
          setIsTasksLoading(false);
        })
        .catch((error: Parse.Error) => {
          setIsTasksLoading(false);
          setIsError(true);
          setTasksError(error.message);
        });
      tasksQuery
        .subscribe()
        .then((sub) => setTasksSubscription(sub))
        .catch((error: Parse.Error) => {
          setIsTasksLoading(false);
          setIsError(true);
          setTasksError(error.message);
        });
    } else {
      showUserIsNotLoggedIn();
    }
  }, [isUserLoggedIn]);

  // Event functions
  const hideLoader = () => {};
  const addTask = useCallback(
    (task: Parse.Object<TaskInterface>) => {
      const { attributes } = task;
      const newTask = { id: task.id, ...attributes };
      const newTasks = [...tasks, newTask];
      setTasks(orderBy(newTasks, ['dueDate'], 'asc'));
    },
    [tasks]
  );
  const updateTask = useCallback(
    (task: Parse.Object<TaskInterface>) => {
      const { attributes, id } = task;
      const filteredTasks = tasks.filter((task) => task.id !== id);
      const newTask = { id: task.id, ...attributes };
      const newTasks = [...filteredTasks, newTask];
      setTasks(orderBy(newTasks, ['dueDate'], 'asc'));
    },
    [tasks]
  );
  const deleteTask = useCallback(
    (task: Parse.Object<TaskInterface>) => {
      const { attributes, id } = task;
      const filteredTasks = tasks.filter((task) => task.id !== id);
      // const newTask = { id: task.id, ...attributes };
      setTasks(orderBy(filteredTasks, ['dueDate'], 'asc'));
    },
    [tasks]
  );

  // useEffects
  useEffect(() => {
    if (decryptWithoutUserData(isUserLoggedIn) !== 'true') {
      showUserIsNotLoggedIn();
    } else if (decryptWithoutUserData(isUserLoggedIn) === 'true') {
      triggerTasksFetch();
    } else {
      showUserIsNotLoggedIn();
    }
  }, [triggerTasksFetch, isUserLoggedIn]);

  useEffect(() => {
    if (tasksSubscription !== null) {
      // List of Events
      //   Open event
      tasksSubscription.on('open', hideLoader);
      //   Create event
      tasksSubscription.on('create', addTask);
      //Update event
      tasksSubscription.on('update', updateTask);
      //   Delete event
      tasksSubscription.on('delete', deleteTask);

      return () => {
        tasksSubscription.off('open', hideLoader);
        tasksSubscription.off('create', addTask);
        tasksSubscription.off('update', updateTask);
        tasksSubscription.off('delete', deleteTask);
      };
      //
    }
  }, [tasksSubscription, addTask, updateTask, deleteTask]);

  return { tasks, isTasksLoading, isError, tasksError, triggerTasksFetch };
};
