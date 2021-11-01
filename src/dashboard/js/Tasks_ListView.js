import React, { useState, useRef, useContext } from 'react';
import { Segment, Button, Header, Icon, Ref } from 'semantic-ui-react';
import Parse from 'parse/dist/parse.min.js';
import {
  formatRelative,
  isBefore,
  isAfter,
  differenceInMinutes,
  differenceInHours,
  differenceInSeconds,
  format,
} from 'date-fns';
import { differenceInDays, differenceInMonths } from 'date-fns/esm';
import TodoAccordion from './components/Todo_Accordion';
import DeleteModal from './components/Delete_Modal';
import MarkDoneModal from './components/Mark_Done_Modal';
import CustomNotificationManager, {
  createNotification,
} from './components/Notification_Manager';
import { DarkThemeContext, CurrentDateContext } from '../..';
import { TaskIDStringContext } from './App';
import { decrypt } from '../../utils/crypto-js-utils';

// CSS
import '../css/todos.css';
import 'react-notifications/lib/notifications.css';

// MEDIA

// Funcs
const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};

// Shorthand date difference
const getShorthandDistanceDiff = (dueDate, currentDate) => {
  let result;
  const date1 = new Date(dueDate);
  const date2 = currentDate;
  const seconds = Math.abs(differenceInSeconds(date1, date2));
  const minutes = Math.abs(differenceInMinutes(date1, date2));
  const hours = Math.abs(differenceInHours(date1, date2));
  const days = Math.abs(differenceInDays(date1, date2));
  const months = Math.abs(differenceInMonths(date1, date2));
  if (seconds < 60) {
    result = `${seconds} secs `;
  } else if (minutes === 1) {
    result = `${minutes} min`;
  } else if (minutes < 60) {
    result = `${minutes} mins `;
  } else if (hours === 1) {
    result = `${hours} hour `;
  } else if (hours < 24) {
    result = `${hours} hrs `;
  } else if (days === 1) {
    result = `${days} day `;
  } else if (months < 1) {
    result = `${days} days `;
  } else if (months === 1) {
    result = `${months} mth `;
  } else {
    result = `${months} mths `;
  }
  return result;
};

// Check if date is before or after
const checkBeforeorAfter = (dueDate, currentDate) => {
  let presentDate = currentDate;
  let dueDateMain = new Date(dueDate);
  if (isBefore(presentDate, dueDateMain)) {
    return ' left';
  } else if (isAfter(presentDate, dueDateMain)) {
    return ' late';
  }
};

// Check if date is after and add red color
const addRedColorOnLateTask = (dueDate, currentDate) => {
  let presentDate = currentDate;
  let dueDateMain = new Date(dueDate);
  if (isAfter(presentDate, dueDateMain)) {
    return 'late-todo-snumber';
  } else {
    return '';
  }
};

// Get relative date
const getRelativeDate = (date, baseDate, options) => {
  return Math.abs(differenceInDays(date, baseDate)) < 6
    ? formatRelative(date, baseDate, options)
    : format(date, `dd/MM/yyyy 'by' p`);
};

// Edit modal opener function
const openEditTaskModal = (ref) => {
  window._handleEditTaskModalTrigger_(ref);
};

// Get taskwithID
const getTaskWithID = (specificTaskID) => {
  let taskToGet = new Parse.Query('Task')
    .equalTo('user', Parse.User.current())
    .equalTo('objectId', specificTaskID)
    .first();
  return taskToGet;
};

// TODOS COMPONENT
const Todos = ({ taskViewString, usersTasks }) => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);
  const currrentDate = useContext(CurrentDateContext);
  const { setTaskIDString } = useContext(TaskIDStringContext);

  // useEffects

  // UseRef for opening CreateNewTodoModal
  const triggerCreateNewTodoModalRef = useRef(null);

  // UseRef for opening EditModal
  const triggerEditModalRef = useRef(null);

  const [specificTaskID, setSpecificTaskID] = useState(null); //To hold ID of todo to delete

  let deleteModalPreviousState = { open: false, result: '' };
  let markDoneModalPreviousState = { open: false, result: '' };

  const [deleteModalPresentState, setdeleteModalState] = useState(
    deleteModalPreviousState
  );
  const [markDoneModalPresentState, setmarkDoneModalState] = useState(
    markDoneModalPreviousState
  );

  // Deletion functions
  const showdeleteTodoModal = (e) => {
    setSpecificTaskID(e.currentTarget.id.split('deleteBtn-')[1]);
    setdeleteModalState({ open: true, result: '' });
  };
  const handleDeleteModalConfirm = () => {
    let todo_id_num = specificTaskID;
    setdeleteModalState({ result: 'confirmed', open: false });
    deleteTodoMainAction(todo_id_num);
  };
  const handleDeleteModalCancel = () => {
    setdeleteModalState({ result: 'cancelled', open: false });
  };
  const deleteTodoMainAction = async (taskID) => {
    let tasktoDel = new Parse.Object('Task');
    tasktoDel.set('objectId', taskID);
    try {
      await tasktoDel.destroy();
      setTimeout(createNotification('delete-success'), 700);
      // Re-fetch tasks
      // fetchTasksDynamic();
    } catch (err) {
      createNotification('error', null, err.message);
    }

    setSpecificTaskID(null);
  };
  // End of deletion functions

  // Mark as Done functions
  const showMarkDoneModal = (e) => {
    setSpecificTaskID(e.currentTarget.id.split('-')[1]);
    setmarkDoneModalState({ open: true, result: '' });
  };
  const handleMarkDoneModalConfirm = () => {
    let todo_id_num = specificTaskID;
    setmarkDoneModalState({ result: 'confirmed', open: false });
    markDoneMainAction(todo_id_num);
  };
  const handleMarkDoneModalCancel = () => {
    setmarkDoneModalState({ result: 'cancelled', open: false });
  };
  const markDoneMainAction = async (id) => {
    await getTaskWithID(id)
      .then(async (task) => {
        let title = task.get('title');
        let date = new Date();
        let historyTask = new Parse.Object('HistoryTask');
        historyTask.set('user', Parse.User.current());
        historyTask.set('title', title);
        historyTask.set('date', date);
        try {
          await historyTask.save();
          await task.destroy();
          setTimeout(() => {
            createNotification('mark-done-success', () => {
              alert('Cannot be reversed...');
            });
            setSpecificTaskID(null);
          }, 500);
          // Re-fetch tasks
          // fetchTasksDynamic();
        } catch (err) {
          createNotification('error', null, err.message);
        }
      })
      .catch((err) => {
        createNotification('error', null, err.message);
      });
  };
  // End of mark as done functions

  return (
    <>
      {taskViewString === 'listView' && (
        <>
          {/* This would be displayed if there is more than one task left */}
          {usersTasks && usersTasks.length > 1 && (
            <Header size='small' inverted={isDarkTheme}>
              {usersTasks.length} Pending Tasks
            </Header>
          )}
          {/* This would be displayed if there is only one task left */}
          {usersTasks && usersTasks.length === 1 && (
            <Header size='small' inverted={isDarkTheme}>
              Showing last pending task
            </Header>
          )}
          {/* This would be displayed if there are no tasks left */}
          {usersTasks && usersTasks.length < 1 && (
            <Segment
              inverted={isDarkTheme}
              padded
              placeholder
              style={{
                backgroundColor: `${!isDarkTheme && 'transparent'}`,
                userSelect: 'none',
                border: 'none',
              }}
            >
              <Header icon>
                <Icon name='check' style={{ color: `${tealColorString}` }} />
                You're all done...
              </Header>
              <Ref innerRef={triggerCreateNewTodoModalRef}>
                <Button
                  inverted={isDarkTheme}
                  type='button'
                  onClick={() =>
                    openCreateNewTodoModal(triggerCreateNewTodoModalRef)
                  }
                >
                  <Icon name='plus circle'></Icon>
                  Create new task
                </Button>
              </Ref>
            </Segment>
          )}
          <div id='todos-container'>
            {usersTasks &&
              usersTasks.map((task, index) => {
                let { objectId, dueDate, title, details } = task;
                dueDate = new Date(dueDate);
                return (
                  <TodoAccordion
                    snumber={
                      getShorthandDistanceDiff(dueDate, currrentDate) +
                      checkBeforeorAfter(dueDate, currrentDate)
                    }
                    key={objectId}
                    title={decrypt(title)}
                    content={decrypt(details)}
                    id={`todo-${objectId}`}
                    className={`${addRedColorOnLateTask(
                      dueDate,
                      currrentDate
                    )}`}
                  >
                    <div className='d-flex align-items-center justify-content-between mb-0'>
                      <span
                        className='mb-0'
                        style={{
                          color: `${tealColorString}`,
                          fontSize: '1.15rem',
                          fontWeight: 'bold',
                        }}
                      >
                        Details :
                      </span>
                      <span
                        className={`mb-0 ${addRedColorOnLateTask(
                          dueDate,
                          currrentDate
                        )}`}
                        style={{
                          fontSize: '.975rem',
                        }}
                      >
                        due{' '}
                        {getRelativeDate(
                          new Date(dueDate),
                          currrentDate
                        ).replace('at', 'by')}
                      </span>
                    </div>
                    <h4
                      className='mt-1'
                      style={{ textAlign: 'left', fontWeight: 'normal' }}
                    >
                      {decrypt(details)}
                    </h4>
                    <div className='d-flex flex-wrap justify-content-end'>
                      <Button
                        style={{ margin: '0 3px' }}
                        className='my-1 my-lg-0 todo-action-btn todo-done-btn'
                        icon='check'
                        content='Done'
                        labelPosition='left'
                        id={`markDoneBtn-${task.objectId}`}
                        onClick={showMarkDoneModal}
                      />
                      <Ref innerRef={triggerEditModalRef}>
                        <Button
                          inverted={isDarkTheme}
                          style={{ margin: '0 3px' }}
                          className='my-1 my-lg-0 todo-action-btn todo-edit-btn'
                          icon='pencil'
                          content='Edit'
                          labelPosition='left'
                          basic
                          color='black'
                          id={`editBtn-${task.objectId}`}
                          onClick={(e) => {
                            setTaskIDString(e.currentTarget.id.split('-')[1]);
                            openEditTaskModal(triggerEditModalRef);
                          }}
                        />
                      </Ref>
                      <Button
                        style={{ margin: '0 3px' }}
                        className='my-1 my-lg-0 todo-action-btn todo-delete-btn'
                        content='Delete'
                        labelPosition='left'
                        icon='trash'
                        id={`deleteBtn-${task.objectId}`}
                        onClick={showdeleteTodoModal}
                      ></Button>
                    </div>
                  </TodoAccordion>
                );
              })}
          </div>

          {/* Delete Modal */}
          <DeleteModal
            PresentState={deleteModalPresentState.open}
            onCancel={handleDeleteModalCancel}
            onConfirm={handleDeleteModalConfirm}
          >
            <div className='px-3 pt-3 pb-2 d-flex flex-column my-primary-bg'>
              <h3 className='open-sans-font my-red-text mb-0'>
                Sure you want to delete this task ?
              </h3>
              <h5 className='my-0 py-1 my-red-text'>
                Note: You can't undo this action.
              </h5>
              <h5 className='my-0 pt-3 my-primary-text'>
                A record of this to-do can be found in your{' '}
                <span
                  style={{ borderBottom: `1.5px solid ${tealColorString}` }}
                >
                  <a href='./' className='my-teal-text'>
                    Archive.
                  </a>
                </span>
              </h5>
            </div>
          </DeleteModal>
          {/* End of delete modal */}

          {/* Mark as Done Modal */}
          <MarkDoneModal
            PresentState={markDoneModalPresentState.open}
            onCancel={handleMarkDoneModalCancel}
            onConfirm={handleMarkDoneModalConfirm}
          >
            <div className='px-3 pt-3 pb-2 d-flex flex-column'>
              <h3 className='open-sans-font my-teal-text mb-0'>
                Sure you want to mark this task as done ?
              </h3>
              <h5 className='my-0 pt-3 my-primary-text'>
                A record of this task can be found in your{' '}
                <span
                  style={{ borderBottom: `1.5px solid ${tealColorString}` }}
                >
                  <a href='./' className='my-teal-text'>
                    Archive.
                  </a>
                </span>
              </h5>
            </div>
          </MarkDoneModal>
          {/* End of Mark as done modal */}

          {/* Notification Manager Container */}
          <CustomNotificationManager />
          {/* End of Notification Manager Container */}
        </>
      )}
    </>
  );
};

export default Todos;
