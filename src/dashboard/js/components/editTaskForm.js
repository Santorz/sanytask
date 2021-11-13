import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Container,
  Header,
  Grid,
  Button,
  Form,
  Ref,
  Dimmer,
  Icon,
  Loader,
} from 'semantic-ui-react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import CustMaterialTheme from './custDateTimePickerTheme';
import { DarkThemeContext } from '../../..';
import { TaskIDStringContext } from '../App';
import { FreshPageLoadContext } from '../DashboardBody';
import { Edit } from 'react-feather';
import { encrypt, decrypt } from '../../../utils/crypto-js-utils';
import { isEqual } from 'lodash';

// Parse SDK
import Parse from 'parse/dist/parse.min.js';

// CSS
import '../../css/edit-task-form.css';

// FUNCTIONS
const submitTask = async (taskObj) => {
  const { dueDate, details, title, id } = taskObj;
  const taskToEdit = new Parse.Query('Task');
  let tasktoSubmit;
  await taskToEdit
    .equalTo('objectId', id)
    .first()
    .then((task) => {
      task.set('title', title);
      task.set('dueDate', dueDate);
      task.set('details', details);
      tasktoSubmit = task;
    })
    .catch((err) => {
      return {
        status: 'failure',
        message: err.message,
      };
    });
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

// Variables relating to tasks
const defaultTaskObjFormat = {
  createdAt: '',
  dueDate: '',
  details: '',
  title: '',
};

// MAIN COMPONENT
const EditTaskForm = () => {
  // Hooks
  const { taskIDString, setTaskIDString } = useContext(TaskIDStringContext);
  const { isDarkTheme } = useContext(DarkThemeContext);
  const setIsFreshPageLoad = useContext(FreshPageLoadContext);

  // State values
  const [existingTaskObj, setExistingTaskObj] = useState(defaultTaskObjFormat);
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [submissionErrorName, setSubmissionErrorName] = useState(null);
  const [showCloseConfirmationDimmer, setShowCloseConfirmationDimmer] =
    useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showDueDateErr, setShowDueDateErr] = useState(false);
  const [originalTask, setOriginalTask] = useState({});

  // useEffects
  useEffect(() => {
    // Find object with id same as taskIDString in localStorage's tasks array
    if (taskIDString) {
      const offlineTasks = localStorage.getItem('usersTasks')
        ? Array.from(JSON.parse(localStorage.getItem('usersTasks')))
        : [];
      const specificTask = offlineTasks.find(
        (task) => task.objectId === taskIDString
      );
      const { dueDate, details, title } = specificTask;
      setExistingTaskObj({
        dueDate: dueDate,
        details: decrypt(details),
        title: decrypt(title),
      });
      setOriginalTask({
        dueDate: dueDate,
        details: decrypt(details),
        title: decrypt(title),
      });
    }
  }, [taskIDString]);

  // Refs
  const editTaskFormRef = useRef(null);

  // Handler functions relating to submission action
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setExistingTaskObj({
      ...existingTaskObj,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encObj = { ...existingTaskObj };
    encObj.title = encrypt(existingTaskObj.title);
    encObj.details = encrypt(existingTaskObj.details);
    encObj.id = taskIDString;
    // Check if due date is equal or less than presnt date and time
    if (
      new Date(existingTaskObj.dueDate) <
      new Date(new Date().getTime() + 2 * 60000)
    ) {
      setShowDueDateErr(true);
    } else {
      // Set due date
      encObj.dueDate = existingTaskObj.dueDate;
      // Show loader
      setSubmissionStarted(true);

      // Update DB
      const taskSubmissionStatus = await submitTask(encObj);
      if (taskSubmissionStatus.status === 'failure') {
        setSubmissionFailure(true);
        let errMsg = taskSubmissionStatus.message;
        setSubmissionErrorName(errMsg.message);
      } else if (taskSubmissionStatus.status === 'success') {
        setSubmissionFailure(false);
        setSubmissionSuccess(true);
      }
    }
  };

  // Clear form, close Modal and return to dashboard
  // Make sure all useStates are reset to initial state here
  const goBackToDashboard = () => {
    setExistingTaskObj(defaultTaskObjFormat);
    setSubmissionStarted(false);
    setSubmissionFailure(false);
    setSubmissionErrorName(null);
    setSubmissionSuccess(false);
    setShowCloseConfirmationDimmer(false);
    setShowDueDateErr(false);
    setTaskIDString(null);
    setOriginalTask({});
    editTaskFormRef.current.reset();
    !isEqual(originalTask, existingTaskObj) && setIsFreshPageLoad(true);
    window._closeEditTaskModal_();
  };

  return (
    <Container fluid className='px-0 px-sm-2 mx-0 mt-3 mt-md-4'>
      <Header
        as='h2'
        className='d-flex mx-auto align-items-center justify-content-center'
        textAlign='center'
        style={{ color: 'white', userSelect: 'none' }}
      >
        Edit task &nbsp;&nbsp;
        <Edit color='white' />
      </Header>
      <Grid stackable padded verticalAlign='top'>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={6}
          largeScreen={5}
          widescreen={4}
          className=' pb-0 px-0 rounded mx-auto'
        >
          {/* Close confirmation Dimmer */}
          {showCloseConfirmationDimmer && (
            <Dimmer active className='rounded custom-blurred-dimmer'>
              <h2>Are you sure you want to Close?</h2>
              <h4 className='mt-2'>N/B: All changes will be lost</h4>
              <Button inverted type='button' onClick={goBackToDashboard}>
                Yes, proceed
              </Button>
              <Button
                inverted
                type='button'
                onClick={() => setShowCloseConfirmationDimmer(false)}
              >
                No I dont
              </Button>
            </Dimmer>
          )}

          {/* Submission process dimmer */}
          {submissionStarted === true && (
            <Dimmer active className='rounded custom-blurred-dimmer'>
              {submissionStarted && !submissionSuccess && !submissionFailure && (
                <Loader style={{ userSelect: 'none', cursor: 'progress' }}>
                  <h3>
                    Submitting task <br />
                    Please wait...
                  </h3>
                </Loader>
              )}
              {submissionStarted && !submissionSuccess && submissionFailure && (
                <>
                  <Icon name='warning sign' size='huge'></Icon>
                  <h3 className='mb-1'>
                    An error occured while submitting task
                  </h3>
                  <h5 className='mt-0'>
                    Error details: {''}
                    <span style={{ color: '#ffa4a4' }}>
                      '{submissionErrorName}'
                    </span>
                  </h5>
                  <Button
                    type='submit'
                    inverted
                    onClick={() => {
                      setSubmissionStarted(false);
                      setSubmissionFailure(false);
                      editTaskFormRef.current.dispatchEvent(
                        new Event('submit', {
                          cancellable: true,
                          bubbles: true,
                        })
                      );
                    }}
                  >
                    <Icon name='refresh'></Icon>
                    Retry
                  </Button>
                  <Button
                    type='button'
                    inverted
                    onClick={() => {
                      setSubmissionStarted(false);
                      setSubmissionFailure(false);
                    }}
                  >
                    <Icon name='close'></Icon>
                    Cancel
                  </Button>
                </>
              )}
              {submissionStarted && submissionSuccess && !submissionFailure && (
                <>
                  <svg
                    className='checkmark'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 52 52'
                  >
                    <circle
                      className='checkmark__circle'
                      cx='26'
                      cy='26'
                      r='25'
                      fill='none'
                    />
                    <path
                      className='checkmark__check'
                      fill='none'
                      d='M14.1 27.2l7.1 7.2 16.7-16.8'
                    />
                  </svg>
                  <h3 className='mb-1'>Task edited successfully</h3>
                  <h5 className='mt-0'>
                    You can now view it in your dashboard
                  </h5>
                  <Button inverted onClick={goBackToDashboard}>
                    Visit Dashboard
                  </Button>
                </>
              )}
            </Dimmer>
          )}
          <Ref innerRef={editTaskFormRef}>
            <Form
              id='editTaskForm'
              className='px-2 py-3 my-primary-bg'
              onSubmit={handleSubmit}
            >
              <Form.Field>
                <label
                  className='ps-2 todo-form-label my-primary-text'
                  htmlFor='taskHeadingEdit'
                >
                  task heading:
                </label>
                <input
                  type='text'
                  name='title'
                  id='taskHeadingEdit'
                  placeholder='Enter a brief heading...'
                  required={true}
                  minLength={3}
                  maxLength={35}
                  value={existingTaskObj.title}
                  onChange={handleChange}
                  className='my-primary-bg my-primary-text'
                />
              </Form.Field>

              <Form.Field>
                <label
                  className='ps-2 todo-form-label my-primary-text'
                  htmlFor='taskDetails'
                >
                  detailed description:
                </label>
                <textarea
                  name='details'
                  id='taskDetails'
                  rows='5'
                  required={true}
                  placeholder='Task description...'
                  value={existingTaskObj.details}
                  onChange={handleChange}
                  className='my-primary-bg my-primary-text'
                />
              </Form.Field>

              {/* Due date Input Field */}
              <Form.Field>
                <label className='ps-2 todo-form-label my-primary-text'>
                  due date:
                </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <ThemeProvider theme={CustMaterialTheme}>
                    <DateTimePicker
                      placeholder='Select due date for task...'
                      inputVariant='standard'
                      value={existingTaskObj.dueDate}
                      onChange={(e) => {
                        setShowDueDateErr(false);
                        const dateVal = new Date(e);
                        dateVal < new Date(new Date().getTime() + 120000)
                          ? setShowDueDateErr(true)
                          : setExistingTaskObj({
                              ...existingTaskObj,
                              dueDate: new Date(e).toUTCString(),
                            });
                      }}
                      minDate={new Date()}
                      maxDate={new Date(new Date().getTime() + 135000 * 60000)}
                      animateYearScrolling={true}
                      disablePast={true}
                      className={`rounded ${
                        showDueDateErr &&
                        'duedate-error-border animate__animated animate__shakeX animate__fast'
                      }`}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
                {showDueDateErr && (
                  <h5 className='d-block my-0 duedate-error-text'>
                    Please update time to at least two minutes from current time
                  </h5>
                )}
              </Form.Field>

              <div className='pb-2 px-1 d-flex justify-content-between'>
                <Button
                  basic={!isDarkTheme ? true : false}
                  type='button'
                  inverted={isDarkTheme}
                  color='red'
                  onClick={() => setShowCloseConfirmationDimmer(true)}
                >
                  Cancel
                </Button>

                <Button
                  basic={false}
                  inverted={isDarkTheme}
                  color='green'
                  type='submit'
                  disabled={isEqual(originalTask, existingTaskObj)}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Ref>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default EditTaskForm;
