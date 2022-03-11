import { TaskDataInterface } from '../components/dashboard/Tasks/NewTaskForm';
import Parse from 'parse';
import { encrypt } from './crypto-js-utils';

//  FUNCTIONS
export const submitTask = async (taskData: TaskDataInterface) => {
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
