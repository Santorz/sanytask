//  FUNCTIONS
export const submitTask = async (taskObj) => {
  const { createdAt, dueDate, details, title } = taskObj;
  let tasktoSubmit = new Parse.Object('Task');
  tasktoSubmit.set('title', title);
  tasktoSubmit.set('createdAt', createdAt);
  tasktoSubmit.set('dueDate', dueDate);
  tasktoSubmit.set('details', details);
  tasktoSubmit.set('user', Parse.User.current());
  try {
    await tasktoSubmit.save();
    return {
      status: 'success',
      message: 'Submission successful',
    };
  } catch (err) {
    return {
      status: 'failure',
      message: err.message,
    };
  }
};
