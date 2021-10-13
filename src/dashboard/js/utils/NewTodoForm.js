import React, { useState, useContext } from 'react';
import {
  Container,
  Header,
  Grid,
  Ref,
  Button,
  Form,
  Dimmer,
  Loader,
  Icon,
} from 'semantic-ui-react';
// Parse SDK
import Parse from 'parse/dist/parse.min.js';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { DarkThemeContext } from '../../..';
import CustMaterialTheme from './custDateTimePickerTheme';
// import { data } from "../data";
import { PlusSquare } from 'react-feather';

// CSS
import '../../css/new-todo-form.css';

// FUNCTIONS
const submitTask = async (taskObj) => {
  const { createdAt, dueDate, details, title } = taskObj;
  let tasktoSubmit = new Parse.Object('Task');

  tasktoSubmit.set('title', title);
  tasktoSubmit.set('createdAt', createdAt);
  tasktoSubmit.set('dueDate', dueDate);
  tasktoSubmit.set('details', details);
  tasktoSubmit.set('user', Parse.User.current());

  console.log(tasktoSubmit);

  try {
    await tasktoSubmit.save();
    return {
      status: 'success',
      message: 'Submission successful',
    };
  } catch (err) {
    return {
      status: 'failure',
      message: err,
    };
  }
};

const NewTodoForm = () => {
  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  // Variables relating to date
  const [dueDateVal, setDueDateVal] = useState(null);

  // Ref for new task form
  const newTaskFormRef = React.useRef(null);

  // Variables relating to to-do
  const originalTodoObjFormat = {
    createdAt: '',
    dueDate: '',
    details: '',
    title: '',
  };
  const [newTodoObj, setNewTodoObj] = useState(originalTodoObjFormat);
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [submissionErrorName, setSubmissionErrorName] = useState(null);
  const [showCloseConfirmationDimmer, setShowCloseConfirmationDimmer] =
    useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showDueDateErr, setShowDueDateErr] = useState(false);

  // Handler functions relating to submission action
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewTodoObj({
      ...newTodoObj,
      createdAt: new Date(),
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if due date is equal or less than presnt date and time
    if (new Date(dueDateVal) < new Date(new Date().getTime() + 2 * 60000)) {
      setShowDueDateErr(true);
    } else {
      // Set due date
      newTodoObj.dueDate = dueDateVal;
      // Show loader
      setSubmissionStarted(true);

      // Update DB
      const taskSubmissionStatus = await submitTask(newTodoObj);
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
    setDueDateVal(null);
    setNewTodoObj(originalTodoObjFormat);
    setSubmissionStarted(false);
    setSubmissionFailure(false);
    setSubmissionErrorName(null);
    setSubmissionSuccess(false);
    setShowCloseConfirmationDimmer(false);
    setShowDueDateErr(false);
    window._closeNewTodoModal_();
  };

  return (
    <Container fluid className='px-0 px-sm-2 mx-0 mt-3 mt-md-4'>
      <Header
        as='h2'
        className='d-flex mx-auto align-items-center justify-content-center text-light'
        textAlign='center'
        style={{ userSelect: 'none' }}
      >
        Create new task &nbsp;&nbsp;
        <PlusSquare />
      </Header>

      <Grid padded verticalAlign='top'>
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={6}
          largeScreen={5}
          widescreen={4}
          className='rounded mx-auto p-0 force-padding-0'
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
                    type='button'
                    inverted
                    onClick={() => {
                      setSubmissionFailure(false);
                      newTaskFormRef.current.dispatchEvent(
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
                  <h3 className='mb-1'>Task submitted successfully</h3>
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

          <Ref innerRef={newTaskFormRef}>
            <Form
              id='newTodoForm'
              className='px-2 py-3 my-primary-bg'
              onSubmit={handleSubmit}
            >
              <Form.Field>
                <label
                  className='ps-2 todo-form-label my-primary-text'
                  htmlFor='title'
                >
                  task heading:
                </label>
                <input
                  type='text'
                  name='title'
                  id='taskHeading'
                  placeholder='Enter a brief heading...'
                  required={true}
                  minLength={10}
                  maxLength={35}
                  value={newTodoObj.title}
                  onChange={handleChange}
                  className='my-primary-bg my-primary-text'
                />
              </Form.Field>

              <Form.Field>
                <label
                  className='ps-2 todo-form-label my-primary-text'
                  htmlFor='details'
                >
                  detailed description:
                </label>
                <textarea
                  className='my-primary-bg my-primary-text'
                  name='details'
                  id='taskDetails'
                  rows='5'
                  required={true}
                  placeholder='Enter to-do description...'
                  value={newTodoObj.details}
                  onChange={handleChange}
                ></textarea>
              </Form.Field>

              {/* Due date Input Field */}
              <Form.Field>
                <label className='ps-2 todo-form-label my-primary-text'>
                  due date:
                </label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <ThemeProvider theme={CustMaterialTheme}>
                    <DateTimePicker
                      inputVariant='standard'
                      value={dueDateVal}
                      onChange={(e) => {
                        setShowDueDateErr(false);
                        setDueDateVal(new Date(e));
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

              <div className='pb-2 px-1 d-flex justify-content-around'>
                <Button
                  basic={!isDarkTheme && 'true'}
                  type='button'
                  inverted={isDarkTheme}
                  color='red'
                  onClick={() => {
                    setShowCloseConfirmationDimmer(true);
                  }}
                >
                  Close
                </Button>
                <Button
                  basic={!isDarkTheme && 'true'}
                  type='button'
                  inverted={isDarkTheme}
                  color='blue'
                >
                  Save as draft
                </Button>
                <Button
                  basic={!isDarkTheme && 'true'}
                  inverted={isDarkTheme}
                  color='green'
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Ref>
          {/*  */}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default NewTodoForm;
