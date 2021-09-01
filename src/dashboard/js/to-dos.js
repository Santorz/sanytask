import React, { useState, useRef } from "react";
import {
  Segment,
  Button,
  Header,
  Icon,
  Ref,
  Placeholder,
} from "semantic-ui-react";
// Parse SDK
// Import Parse minified version
import Parse from "parse/dist/parse.min.js";
import {
  formatRelative,
  isBefore,
  isAfter,
  differenceInMinutes,
  differenceInHours,
  differenceInSeconds,
  format,
} from "date-fns";
import { differenceInDays, differenceInMonths } from "date-fns/esm";
import TodoAccordion from "./utils/Todo_Accordion";
import DeleteModal from "./utils/Delete_Modal";
import MarkDoneModal from "./utils/Mark_Done_Modal";
import CustomNotificationManager, {
  createNotification,
} from "./utils/Notification_Manager";

// CSS
import "../css/todos.css";
import "react-notifications/lib/notifications.css";

// MEDIA
import tasksFetchErrorPic from "../media/404-error-main.svg";

// Funcs
const openCreateNewTodoModal = (ref) => {
  window._handleNewTodoModalTrigger_(ref);
};

// Shorthand date difference
const getShorthandDistanceDiff = (dueDate) => {
  let result;
  const date1 = new Date(dueDate);
  const date2 = new Date();
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
const checkBeforeorAfter = (dueDate) => {
  let presentDate = new Date();
  let dueDateMain = new Date(dueDate);
  if (isBefore(presentDate, dueDateMain)) {
    return " left";
  } else if (isAfter(presentDate, dueDateMain)) {
    return " late";
  }
};

// Check if date is after and add red color
const addRedColorOnLateTask = (dueDate) => {
  let presentDate = new Date();
  let dueDateMain = new Date(dueDate);
  if (isAfter(presentDate, dueDateMain)) {
    return "late-todo-snumber";
  } else {
    return "";
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

// TODOS COMPONENT
const Todos = () => {
  // State for user fetching
  const [tasksLoading, setTasksLoading] = useState(true);
  const [usersTasks, setUsersTasks] = useState(null);
  const [isTasksFetchErr, setIsTasksFetchErr] = useState(false);
  const [fetchErrMsg, setFetchErrMsg] = useState("");

  // The main fetcher of tasks at page load
  React.useEffect(() => {
    const parseQuery = new Parse.Query("Task");
    parseQuery
      .equalTo("user", Parse.User.current())
      .find()
      .then((data) => {
        data.sort((a, b) => {
          let da = new Date(a.attributes.dueDate);
          let db = new Date(b.attributes.dueDate);
          if (da > db) {
            return 1;
          } else {
            return -1;
          }
        });
        setUsersTasks(data);
        setTasksLoading(false);
      })
      .catch((error) => {
        setFetchErrMsg(error.message);
        setTasksLoading(false);
        setIsTasksFetchErr(true);
      });
  }, []);

  // The fetch function for fetching tasks dynamically
  const fetchTasksDynamic = () => {
    setIsTasksFetchErr(false);
    setTasksLoading(true);
    const parseQuery = new Parse.Query("Task");
    parseQuery
      .equalTo("user", Parse.User.current())
      .find()
      .then((data) => {
        data.sort((a, b) => {
          let da = new Date(a.attributes.dueDate);
          let db = new Date(b.attributes.dueDate);
          if (da > db) {
            return 1;
          } else {
            return -1;
          }
        });
        setUsersTasks(data);
        setTasksLoading(false);
      })
      .catch((error) => {
        setFetchErrMsg(error.message);
        setTasksLoading(false);
        setIsTasksFetchErr(true);
      });
  };

  // UseRef for opening CreateNewTodoModal
  const triggerCreateNewTodoModalRef = useRef(null);

  // UseRef for opening EditModal
  const triggerEditModalRef = useRef(null);

  const [specificTaskID, setSpecificTaskID] = useState(null); //To hold ID of todo to delete

  let deleteModalPreviousState = { open: false, result: "" };
  let markDoneModalPreviousState = { open: false, result: "" };

  const [deleteModalPresentState, setdeleteModalState] = useState(
    deleteModalPreviousState
  );
  const [markDoneModalPresentState, setmarkDoneModalState] = useState(
    markDoneModalPreviousState
  );

  // Deletion functions
  const showdeleteTodoModal = (e) => {
    setSpecificTaskID(e.currentTarget.id.split("deleteBtn-")[1]);
    setdeleteModalState({ open: true, result: "" });
  };
  const handleDeleteModalConfirm = () => {
    let todo_id_num = specificTaskID;
    setdeleteModalState({ result: "confirmed", open: false });
    deleteTodoMainAction(todo_id_num);
  };
  const handleDeleteModalCancel = () => {
    setdeleteModalState({ result: "cancelled", open: false });
  };
  const deleteTodoMainAction = async (taskID) => {
    console.log(taskID);

    let tasktoDel = new Parse.Object("Task");
    tasktoDel.set("objectId", taskID);
    try {
      await tasktoDel.destroy();
      console.log("Task deleted");
      createNotification("delete-success");
      // Ref-fetch tasks
      fetchTasksDynamic();
    } catch (err) {
      console.log(err);
    }

    setSpecificTaskID(null);
  };
  // End of deletion functions

  // Mark as Done functions
  const showMarkDoneModal = (e) => {
    setSpecificTaskID(Number(e.currentTarget.id.split("-")[1]));
    setmarkDoneModalState({ open: true, result: "" });
  };
  const handleMarkDoneModalConfirm = () => {
    let todo_id_num = specificTaskID;
    setmarkDoneModalState({ result: "confirmed", open: false });
    markDoneMainAction(todo_id_num);
  };
  const handleMarkDoneModalCancel = () => {
    setmarkDoneModalState({ result: "cancelled", open: false });
  };
  const markDoneMainAction = (id) => {
    // let newTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(newTodos);
    createNotification("mark-done-success", () => {
      alert("Cannot be reversed...");
    });
    setSpecificTaskID(null);
  };
  // End of mark as done functions

  return (
    <>
      {/* This would be displayed if there is more than one task left */}
      {!tasksLoading &&
        !isTasksFetchErr &&
        usersTasks &&
        usersTasks.length > 1 && (
          <Header size="medium" color="black">
            {usersTasks.length} Pending Tasks
          </Header>
        )}
      {/* This would be displayed if there is only one task left */}
      {!tasksLoading && usersTasks && usersTasks.length === 1 && (
        <Header size="medium" color="black">
          {usersTasks.length} Pending Task
        </Header>
      )}
      {/* This would be displayed if there are no tasks left */}
      {!tasksLoading && usersTasks && usersTasks.length < 1 && (
        <Segment
          padded
          placeholder
          style={{
            userSelect: "none",
            backgroundColor: "transparent !important",
          }}
        >
          <Header icon>
            <Icon name="check" style={{ color: "#006975" }} />
            You're all done...
          </Header>
          <Ref innerRef={triggerCreateNewTodoModalRef}>
            <Button
              basic
              color="black"
              type="button"
              onClick={() =>
                openCreateNewTodoModal(triggerCreateNewTodoModalRef)
              }
            >
              <Icon name="plus circle"></Icon>
              Create new task
            </Button>
          </Ref>
        </Segment>
      )}
      <div id="todos-container">
        {tasksLoading && !usersTasks && (
          <>
            <h3 className="mb-3">Loading tasks</h3>
            <Placeholder
              fluid
              className="my-2 rounded bordered-placeholder-loader"
            >
              <Placeholder.Header></Placeholder.Header>
              <Placeholder.Line length="full"></Placeholder.Line>
              <Placeholder.Line length="full"></Placeholder.Line>
            </Placeholder>
            <Placeholder
              fluid
              className="my-2 rounded bordered-placeholder-loader"
            >
              <Placeholder.Header></Placeholder.Header>
              <Placeholder.Line length="full"></Placeholder.Line>
              <Placeholder.Line length="full"></Placeholder.Line>
            </Placeholder>
            <Placeholder
              fluid
              className="my-2 rounded bordered-placeholder-loader"
            >
              <Placeholder.Header></Placeholder.Header>
              <Placeholder.Line length="full"></Placeholder.Line>
              <Placeholder.Line length="full"></Placeholder.Line>
            </Placeholder>
            <Placeholder
              fluid
              className="my-2 rounded bordered-placeholder-loader"
            >
              <Placeholder.Header></Placeholder.Header>
              <Placeholder.Line length="full"></Placeholder.Line>
              <Placeholder.Line length="full"></Placeholder.Line>
            </Placeholder>
          </>
        )}
        {isTasksFetchErr && !tasksLoading && (
          <div style={{ userSelect: "none" }} className="mt-3 mb-2">
            <img
              style={{ cursor: "not-allowed" }}
              src={tasksFetchErrorPic}
              alt="Error fetching tasks"
              width="150"
              height="150"
              onContextMenu={(e) => e.preventDefault()}
            />
            <h3 className="my-2 red-text">Something went wrong...</h3>
            <h4 className="mt-2 mb-1">
              There was a problem getting your tasks.
            </h4>
            <h5 className="red-text mt-0">{fetchErrMsg}</h5>
            <Button
              type="button"
              className="shadow"
              color="black"
              onClick={fetchTasksDynamic}
            >
              <Icon name="refresh"></Icon>
              Retry
            </Button>
          </div>
        )}
        {usersTasks &&
          usersTasks.map((task, index) => {
            const { id, attributes } = task;
            const { dueDate, title, details } = attributes;
            return (
              <TodoAccordion
                snumber={
                  getShorthandDistanceDiff(dueDate) +
                  checkBeforeorAfter(dueDate)
                }
                key={id}
                title={title}
                content={details}
                id={`todo-${id}`}
                className={`${addRedColorOnLateTask(dueDate)}`}
              >
                <div className="d-flex align-items-center justify-content-between mb-0">
                  <span
                    className="mb-0"
                    style={{
                      color: "#006976",
                      fontSize: "1.15rem",
                      fontWeight: "bold",
                    }}
                  >
                    Details :
                  </span>
                  <span
                    className={`mb-0 ${addRedColorOnLateTask(dueDate)}`}
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    due{" "}
                    {getRelativeDate(new Date(dueDate), new Date()).replace(
                      "at",
                      "by"
                    )}
                  </span>
                </div>
                <h4 className="mt-1" style={{ textAlign: "left" }}>
                  {details}
                </h4>
                <div className="d-flex flex-wrap justify-content-end">
                  <Button
                    style={{ margin: "0 3px" }}
                    className="my-1 my-lg-0 todo-action-btn todo-done-btn"
                    icon="check"
                    content="Done"
                    labelPosition="left"
                    id={`markDoneBtn-${task.id}`}
                    onClick={showMarkDoneModal}
                  ></Button>
                  <Ref innerRef={triggerEditModalRef}>
                    <Button
                      style={{ margin: "0 3px" }}
                      className="my-1 my-lg-0 todo-action-btn todo-edit-btn"
                      icon="pencil"
                      content="Edit"
                      labelPosition="left"
                      basic
                      color="black"
                      id={`editBtn-${task.id}`}
                      onClick={() => {
                        openEditTaskModal(triggerEditModalRef);
                      }}
                    ></Button>
                  </Ref>
                  <Button
                    style={{ margin: "0 3px" }}
                    className="my-1 my-lg-0 todo-action-btn todo-delete-btn"
                    content="Delete"
                    labelPosition="left"
                    basic
                    color="red"
                    icon="trash"
                    id={`deleteBtn-${task.id}`}
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
        <div className="px-3 pt-3 pb-2 d-flex flex-column">
          <h3 className="open-sans-font red-text mb-0">
            Are you sure you want to delete this task ?
          </h3>
          <h5 className="my-0 py-1 red-text">
            Note: You can't undo this action.
          </h5>
          <h5 className="my-0 pt-3">
            A record of this to-do can be found in your{" "}
            <span style={{ borderBottom: "1.5px solid #006976" }}>
              <a href="./" className="teal-text">
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
        <div className="px-3 pt-3 pb-2 d-flex flex-column">
          <h3 className="open-sans-font teal-text mb-0">
            Sure you want to mark this to-do as done ?
          </h3>
          <h5 className="my-0 pt-3">
            A record of this to-do can be found in your{" "}
            <span style={{ borderBottom: "1.5px solid #006976" }}>
              <a href="./" className="teal-text">
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
  );
};

export default Todos;
