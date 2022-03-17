import { TaskDataInterface } from '../components/dashboard/Tasks/NewTaskForm';
import Parse from 'parse';
import { encrypt } from './crypto-js-utils';

//  FUNCTIONS

// Get taskwithID
const getTaskWithID = async (specificTaskID: string) => {
  let taskToGet = new Parse.Query('Task')
    .equalTo('user', Parse.User.current())
    .equalTo('objectId', specificTaskID)
    .first();
  return taskToGet;
};

export const submitNewTask = async (taskData: TaskDataInterface) => {
  const { dueDate, details, title } = taskData;
  let tasktoSubmit = new Parse.Object('Task');
  tasktoSubmit.set('title', encrypt(title));
  tasktoSubmit.set('dueDate', new Date(dueDate).toUTCString());
  tasktoSubmit.set('details', encrypt(details));
  tasktoSubmit.set('user', Parse.User.current());
  try {
    await tasktoSubmit.save();
    return {
      status: 'success',
      message: 'Submission successful',
    };
  } catch (err: Parse.Error | any) {
    return {
      status: 'failure',
      message: err.message,
    };
  }
};

export const deleteTask = async (taskId: string) => {
  let tasktoDel = new Parse.Object('Task');
  tasktoDel.set('objectId', taskId);
  try {
    await tasktoDel.destroy();
    return {
      status: 'success',
      message: 'Deletion successful',
    };
  } catch (err: Parse.Error | any) {
    return {
      status: 'failure',
      message: err.message,
    };
  }
};

export const markTaskDone = async (id: string) => {
  const specificTask = await getTaskWithID(id);

  let title = (await specificTask.get('title')) as string;
  let date = (await specificTask.get('createdAt')) as Date;
  let user = Parse.User.current();
  const accountType = user.get('accountType') as 'free' | 'pro';
  let historyTask = new Parse.Object('HistoryTask');
  if (accountType === 'pro') {
    historyTask.set('user', user);
    historyTask.set('title', title);
    historyTask.set('date', date);
  }
  try {
    if (accountType === 'pro') {
      await historyTask.save();
    }
    await specificTask.destroy();
    return {
      status: 'success',
      message: 'Deletion successful',
    };
  } catch (err) {
    return {
      status: 'failure',
      message: err.message,
    };
  }
};

export const submitEditedTask = async (
  taskId: string,
  taskData: TaskDataInterface
) => {
  const specificTask = await getTaskWithID(taskId);
  const { title, details, dueDate } = taskData;
  specificTask.set('title', encrypt(title));
  specificTask.set('dueDate', new Date(dueDate).toUTCString());
  specificTask.set('details', encrypt(details));
  console.log(specificTask);

  try {
    await specificTask.save();
    return {
      status: 'success',
      message: 'Task edited successfully',
    };
  } catch (err) {
    return {
      status: 'failure',
      message: err.message,
    };
  }
};
