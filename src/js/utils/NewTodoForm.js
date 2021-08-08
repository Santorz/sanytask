import React, { useState } from "react";
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
} from "semantic-ui-react";
// import "date-fns";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import CustMaterialTheme from "./custDateTimePickerTheme";
// import { data } from "../data";
import { PlusSquare } from "react-feather";

// CSS
import "../../css/new-todo-form.css";

// FUNCTIONS
const submitTask = async (taskObj) => {
  let data = await fetch("http://localhost:8080/todos", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((_data) => {
      return _data;
    })
    .catch((error) => {
      return "err" + error;
    });
  return data;
};

const NewTodoForm = () => {
  // Variables relating to date
  const [dueDateVal, setDueDateVal] = useState(null);

  // Ref for new task form
  const newTaskFormRef = React.useRef(null);

  // Variables relating to to-do
  const originalTodoObjFormat = {
    dateCreated: "",
    dueDate: "",
    id: null,
    taskDetails: "",
    taskHeading: "",
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
      dateCreated: new Date().toUTCString(),
      id: Number(new Date().getTime().toString()),
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
      if (typeof taskSubmissionStatus !== "object") {
        setSubmissionFailure(true);
        let err_name = taskSubmissionStatus.split("err")[1];
        setSubmissionErrorName(err_name);
      } else if (typeof taskSubmissionStatus === "object") {
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
    <Container fluid className="px-0 px-sm-2 mx-0 mt-3 mt-md-4">
      <Header
        as="h2"
        className="d-flex mx-auto align-items-center justify-content-center"
        textAlign="center"
        style={{ color: "white", userSelect: "none" }}
      >
        Create new task &nbsp;&nbsp;
        <PlusSquare color="white" />
      </Header>

      <Grid stackable padded verticalAlign="top">
        <Grid.Column
          mobile={16}
          tablet={8}
          computer={6}
          largeScreen={5}
          widescreen={4}
          className=" pb-0 px-0 rounded mx-auto"
        >
          {/* Close confirmation Dimmer */}
          {showCloseConfirmationDimmer && (
            <Dimmer active className="rounded">
              <h2>Are you sure you want to Close?</h2>
              <h4 className="mt-2">N/B: All changes will be lost</h4>
              <Button inverted type="button" onClick={goBackToDashboard}>
                Yes, proceed
              </Button>
              <Button
                inverted
                type="button"
                onClick={() => setShowCloseConfirmationDimmer(false)}
              >
                No I dont
              </Button>
            </Dimmer>
          )}

          {/* Submission process dimmer */}
          {submissionStarted === true && (
            <Dimmer active className="rounded custom-blurred-dimmer">
              {submissionStarted && !submissionSuccess && !submissionFailure && (
                <Loader style={{ userSelect: "none", cursor: "progress" }}>
                  <h3>
                    Submitting task <br />
                    Please wait...
                  </h3>
                </Loader>
              )}
              {submissionStarted && !submissionSuccess && submissionFailure && (
                <>
                  <Icon name="warning sign" size="huge"></Icon>
                  <h3 className="mb-1">
                    An error occured while submitting task
                  </h3>
                  <h5 className="mt-0">
                    Error details: {""}
                    <span style={{ color: "#ffa4a4" }}>
                      '{submissionErrorName}'
                    </span>
                  </h5>
                  <Button
                    type="button"
                    inverted
                    onClick={() => {
                      setSubmissionFailure(false);
                      newTaskFormRef.current.dispatchEvent(
                        new Event("submit", {
                          cancellable: true,
                          bubbles: true,
                        })
                      );
                    }}
                  >
                    <Icon name="refresh"></Icon>
                    Retry
                  </Button>
                  <Button
                    type="button"
                    inverted
                    onClick={() => {
                      setSubmissionStarted(false);
                    }}
                  >
                    <Icon name="close"></Icon>
                    Cancel
                  </Button>
                </>
              )}
              {submissionStarted && submissionSuccess && !submissionFailure && (
                <>
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                  <h3 className="mb-1">Task submitted successfully</h3>
                  <h5 className="mt-0">
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
              id="newTodoForm"
              className="px-2 py-3"
              onSubmit={handleSubmit}
            >
              <Form.Field>
                <label className="ps-2 todo-form-label" htmlFor="taskHeading">
                  task heading:
                </label>
                <input
                  type="text"
                  name="taskHeading"
                  id="taskHeading"
                  placeholder="Enter a brief heading..."
                  required={true}
                  maxLength={35}
                  value={newTodoObj.taskHeading}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label className="ps-2 todo-form-label" htmlFor="taskDetails">
                  detailed description:
                </label>
                <textarea
                  name="taskDetails"
                  id="taskDetails"
                  rows="5"
                  required={true}
                  placeholder="Enter to-do description..."
                  value={newTodoObj.taskDetails}
                  onChange={handleChange}
                ></textarea>
              </Form.Field>

              {/* Due date Input Field */}
              <Form.Field>
                <label className="ps-2 todo-form-label">due date:</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <ThemeProvider theme={CustMaterialTheme}>
                    <DateTimePicker
                      inputVariant="standard"
                      value={dueDateVal}
                      onChange={(e) => {
                        setShowDueDateErr(false);
                        setDueDateVal(new Date(e).toUTCString());
                      }}
                      minDate={new Date()}
                      maxDate={new Date(new Date().getTime() + 135000 * 60000)}
                      animateYearScrolling={true}
                      disablePast={true}
                      className={`rounded ${
                        showDueDateErr &&
                        "duedate-error-border animate__animated animate__shakeX animate__fast"
                      }`}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
                {showDueDateErr && (
                  <h5 className="d-block my-0 duedate-error-text">
                    Please update time to at least two minutes from current time
                  </h5>
                )}
              </Form.Field>

              <div className="pb-2 px-1 d-flex justify-content-around">
                <Button
                  basic
                  type="button"
                  color="red"
                  onClick={() => {
                    setShowCloseConfirmationDimmer(true);
                  }}
                >
                  Close
                </Button>
                <Button basic color="blue" type="button">
                  Save as draft
                </Button>
                <Button basic color="green" type="submit">
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
