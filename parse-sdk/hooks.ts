import { useEffect, useState } from 'react';
import Parse from 'parse';
import { orderBy } from 'lodash';
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
  user: Parse.User;
  createdAt: Date;
  details: string;
  dueDate: string;
  title: string;
}

export const useTasksLiveQuery = () => {
  const [tasks, setTasks] = useState<Array<TaskInterface>>(null);
  const [isTasksLoading, setIsTasksLoading] = useState<boolean>(true);
  let [tasksSubscription, setTasksSubscription] =
    useState<Parse.LiveQuerySubscription>(null);

  // Event functions
  const hideLoader = () => {
    setIsTasksLoading(false);
  };
  const addTask = (task: Parse.Object<TaskInterface>) => {
    const { attributes } = task;
    const newTask = { id: task.id, ...attributes };
    const newTasks = [...tasks, newTask];
    setTasks(orderBy(newTasks, ['dueDate'], 'asc'));
  };
  const updateTask = (task: Parse.Object<TaskInterface>) => {
    const { attributes, id } = task;
    const filteredTasks = tasks.filter((task) => task.id !== id);
    const newTask = { id: task.id, ...attributes };
    const newTasks = [...filteredTasks, newTask];
    setTasks(orderBy(newTasks, ['dueDate'], 'asc'));
  };
  const deleteTask = (task: Parse.Object<TaskInterface>) => {
    const { attributes, id } = task;
    const filteredTasks = tasks.filter((task) => task.id !== id);
    // const newTask = { id: task.id, ...attributes };
    setTasks(orderBy(filteredTasks, ['dueDate'], 'asc'));
  };

  useEffect(() => {
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
      });
    tasksQuery.subscribe().then((sub) => setTasksSubscription(sub));
  }, []);

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
  }, [tasksSubscription]);

  return { tasks, isTasksLoading };
};
