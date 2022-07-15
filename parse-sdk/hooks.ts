import { useEffect, useState, useCallback, useContext } from 'react';
import Parse from 'parse';
import { useRouter } from 'next/router';
import { decryptWithoutUserData } from '../utils/crypto-js-utils';
import { UserLoginStateContext } from '../components/general/UserLoginState';
import { useCustomToast, toastType } from '../utils/useCustomToast';

// Interfaces
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
  const { encLoggedInString, invokeSignOut } = useContext(
    UserLoginStateContext
  );
  const { showCustomToast, closeAllToasts } = useCustomToast();
  const router = useRouter();

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
    setTasksError('not-logged-in');
  };

  const triggerTasksFetch = useCallback(() => {
    if (!tasks && router.asPath === '/dashboard') {
      if (decryptWithoutUserData(encLoggedInString) !== 'true') {
        showUserIsNotLoggedIn();
      } else if (decryptWithoutUserData(encLoggedInString) === 'true') {
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
            const sortedTasks: Array<TaskInterface> = tasks.sort(
              (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
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
            if (error.code === 209) {
              invokeSignOut();
            }
          });
        tasksQuery
          .subscribe()
          .then((sub) => setTasksSubscription(sub))
          .catch((error: Parse.Error) => {
            setIsTasksLoading(false);
            setIsError(true);
            setTasksError(error.message);
            if (error.code === 209) {
              invokeSignOut();
            }
          });
      } else {
        showUserIsNotLoggedIn();
      }
    }
  }, [encLoggedInString, invokeSignOut, router.asPath, tasks]);

  // Show notification func
  const showNotif = useCallback(
    (type: toastType, msg: string) => {
      if (router.asPath.includes('/dashboard')) {
        closeAllToasts();
        showCustomToast(type, msg);
      } else return;
    },
    [closeAllToasts, router.asPath, showCustomToast]
  );

  // Event functions
  const refetchTasks = useCallback(() => {
    // if (isError) {
    //   closeAllToasts();
    //   showCustomToast('info', 'Connection restored.');
    //   triggerTasksFetch();
    // }
  }, []);
  const addTask = useCallback(
    (task: Parse.Object<TaskInterface>) => {
      const { attributes } = task;
      const newTask = { id: task.id, ...attributes };
      const newTasks = [...tasks, newTask];
      setTasks(
        newTasks.sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate))
      );
    },
    [tasks]
  );
  const updateTask = useCallback(
    (task: Parse.Object<TaskInterface>) => {
      const { attributes, id } = task;
      const filteredTasks = tasks.filter((task) => task.id !== id);
      const newTask = { id: task.id, ...attributes };
      const newTasks = [...filteredTasks, newTask];
      setTasks(
        newTasks.sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate))
      );
    },
    [tasks]
  );
  const deleteTask = useCallback(
    (task: Parse.Object<TaskInterface>) => {
      const { attributes, id } = task;
      const filteredTasks = tasks.filter((task) => task.id !== id);
      // const newTask = { id: task.id, ...attributes };
      setTasks(
        filteredTasks.sort(
          (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
        )
      );
    },
    [tasks]
  );

  // useEffects

  // to be fired onLoad
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (decryptWithoutUserData(encLoggedInString) !== 'true') {
        showUserIsNotLoggedIn();
      } else if (decryptWithoutUserData(encLoggedInString) === 'true') {
        triggerTasksFetch();
      } else {
        showUserIsNotLoggedIn();
      }
    }
  }, [triggerTasksFetch, encLoggedInString]);

  useEffect(() => {
    if (tasksSubscription !== null) {
      // List of Events
      //   Open event
      tasksSubscription.on('open', refetchTasks);
      //   Create event
      tasksSubscription.on('create', addTask);
      //Update event
      tasksSubscription.on('update', updateTask);
      //   Delete event
      tasksSubscription.on('delete', deleteTask);

      return () => {
        tasksSubscription.off('open', refetchTasks);
        tasksSubscription.off('create', addTask);
        tasksSubscription.off('update', updateTask);
        tasksSubscription.off('delete', deleteTask);
      };
      //
    }
  }, [tasksSubscription, addTask, updateTask, deleteTask, refetchTasks]);

  return { tasks, isTasksLoading, isError, tasksError, triggerTasksFetch };
};
