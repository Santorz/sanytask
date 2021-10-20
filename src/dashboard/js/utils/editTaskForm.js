import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Header, Grid, Button, Form, Ref } from 'semantic-ui-react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import CustMaterialTheme from './custDateTimePickerTheme';
import { TaskIDStringContext } from '../App';
import { Edit } from 'react-feather';

// Parse SDK
import Parse from 'parse/dist/parse.min.js';

// CSS
import '../../css/edit-task-form.css';

// FUNCTIONS
const submitTask = async (taskObj) => {
  const { dueDate, details, title } = taskObj;
  let tasktoSubmit = new Parse.Object('Task');

  tasktoSubmit.set('title', title);
  tasktoSubmit.set('dueDate', dueDate);
  tasktoSubmit.set('details', details);

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

// Variables relating to to-do
const deafultTaskObjFormat = {
  createdAt: '',
  dueDate: '',
  details: '',
  title: '',
};

const EditTaskForm = () => {
  // Hooks
  const { taskIDString, setTaskIDString } = useContext(TaskIDStringContext);

  // State values
  const [dueDateVal, setDueDateVal] = useState(null);
  const [existingTaskObj, setExistingTaskObj] = useState(deafultTaskObjFormat);
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [submissionFailure, setSubmissionFailure] = useState(false);
  const [submissionErrorName, setSubmissionErrorName] = useState(null);
  const [showCloseConfirmationDimmer, setShowCloseConfirmationDimmer] =
    useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showDueDateErr, setShowDueDateErr] = useState(false);

  // useEffects
  useEffect(() => {
    // Find object with id same as taskIDString in localStorage's tasks array
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
    // Check if due date is equal or less than presnt date and time
    if (new Date(dueDateVal) < new Date(new Date().getTime() + 2 * 60000)) {
      setShowDueDateErr(true);
    } else {
      // Set due date
      existingTaskObj.dueDate = dueDateVal;
      // Show loader
      setSubmissionStarted(true);

      // Update DB
      const taskSubmissionStatus = await submitTask(existingTaskObj);
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
    setExistingTaskObj(deafultTaskObjFormat);
    setSubmissionStarted(false);
    setSubmissionFailure(false);
    setSubmissionErrorName(null);
    setSubmissionSuccess(false);
    setShowCloseConfirmationDimmer(false);
    setShowDueDateErr(false);
    setTaskIDString(null);
    editTaskFormRef.current.reset();
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
          <Ref innerRef={editTaskFormRef}>
            <Form
              id='editTaskForm'
              className='px-2 py-3 mx-0'
              onSubmit={handleSubmit}
            >
              <Form.Field>
                <label
                  className='ps-2 todo-form-label'
                  htmlFor='taskHeadingEdit'
                >
                  task heading:
                </label>
                <input
                  type='text'
                  name='taskHeadingEdit'
                  id='taskHeadingEdit'
                  placeholder='Enter a brief heading...'
                  required={true}
                  minLength={3}
                  maxLength={35}
                  value={existingTaskObj.taskHeading}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label className='ps-2 todo-form-label' htmlFor='taskDetails'>
                  detailed description:
                </label>
                <textarea
                  name='taskDetails'
                  id='taskDetails'
                  rows='5'
                  required={true}
                  placeholder='Task description...'
                  value={existingTaskObj.taskDetails}
                  onChange={handleChange}
                />
              </Form.Field>

              {/* Due date Input Field */}
              <Form.Field>
                <label className='ps-2 todo-form-label'>due date:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <ThemeProvider theme={CustMaterialTheme}>
                    <DateTimePicker
                      placeholder='Enter due date...'
                      value={dueDateVal}
                      onChange={(e) => {
                        setDueDateVal(new Date(e).toUTCString());
                      }}
                      minDate={new Date()}
                      maxDate={new Date(new Date().getTime() + 135000 * 60000)}
                      animateYearScrolling={true}
                      disablePast={true}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </Form.Field>

              <div className='pb-2 px-1 d-flex justify-content-between'>
                <Button
                  basic
                  type='button'
                  color='red'
                  onClick={() => {
                    let closeConfirmation = window.confirm(
                      'Sure you want to cancel?'
                    );
                    if (closeConfirmation) {
                      // Reset form
                      goBackToDashboard();
                    }
                  }}
                >
                  Cancel
                </Button>

                <Button basic color='green' type='submit'>
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
