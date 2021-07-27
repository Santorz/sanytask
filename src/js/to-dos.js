import React, { useState } from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { data } from "./data";
import TodoAccordion from "./Todo_Accordion";
import DeleteModal from "./utils/Delete_Modal";
import MarkDoneModal from "./utils/Mark_Done_Modal";
import CustomNotificationManager, {
  createNotification,
} from "./utils/Notification_Manager";

// CSS
import "semantic-ui-css/semantic.min.css";
import "../css/bootstrap-utilities.min.css";
// import "animate.css";
import "../css/todos.css";
import "react-notifications/lib/notifications.css";

// TODOS COMPONENT
const Todos = () => {
  const [todos, setTodos] = useState(data);
  const [specificTodoID, setSpecificTodoID] = useState(null); //To hold ID of todo to delete

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
    setSpecificTodoID(Number(e.currentTarget.id.split("-")[1]));
    setdeleteModalState({ open: true, result: "" });
  };
  const handleDeleteModalConfirm = () => {
    let todo_id_num = specificTodoID;
    setdeleteModalState({ result: "confirmed", open: false });
    deleteTodoMainAction(todo_id_num);
  };
  const handleDeleteModalCancel = () => {
    setdeleteModalState({ result: "cancelled", open: false });
  };
  const deleteTodoMainAction = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    createNotification("delete-success", () => {
      alert("Cannot be reversed...");
    });
    setSpecificTodoID(null);
  };
  // End of deletion functions

  // Mark as Done functions
  const showMarkDoneModal = (e) => {
    setSpecificTodoID(Number(e.currentTarget.id.split("-")[1]));
    setmarkDoneModalState({ open: true, result: "" });
  };
  const handleMarkDoneModalConfirm = () => {
    let todo_id_num = specificTodoID;
    setmarkDoneModalState({ result: "confirmed", open: false });
    markDoneMainAction(todo_id_num);
  };
  const handleMarkDoneModalCancel = () => {
    setmarkDoneModalState({ result: "cancelled", open: false });
  };
  const markDoneMainAction = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    createNotification("mark-done-success", () => {
      alert("Cannot be reversed...");
    });
    setSpecificTodoID(null);
  };
  // End of mark as done functions

  return (
    <>
      {/* This would be displayed if there is more than one task left */}
      {todos.length > 1 && (
        <h4 style={{ margin: "1rem 0", color: "#006976" }}>
          You have {todos.length} tasks to complete.
        </h4>
      )}
      {/* This would be displayed if there is only one task left */}
      {todos.length === 1 && (
        <h4 style={{ margin: "1rem 0", color: "#006976" }}>
          You have {todos.length} task to complete.
        </h4>
      )}
      {/* This would be displayed if there are no tasks left */}
      {todos.length < 1 && (
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
          <Button basic color="black">
            <Icon name="plus circle"></Icon>
            Create new task
          </Button>
        </Segment>
      )}
      <div id="todos-container">
        {todos.map((todo, index) => {
          const { id, text, details } = todo;
          return (
            <TodoAccordion
              snumber={index + 1}
              key={id}
              title={text}
              content={text}
              id={`todo-${id}`}
            >
              <h3
                className="mb-0"
                style={{
                  color: "teal",
                  textAlign: "left",
                  fontSize: "1.15rem",
                }}
              >
                Details :
              </h3>
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
                  id={`markDoneBtn-${todo.id}`}
                  onClick={showMarkDoneModal}
                ></Button>
                <Button
                  style={{ margin: "0 3px" }}
                  className="my-1 my-lg-0 todo-action-btn todo-edit-btn"
                  icon="pencil"
                  content="Edit"
                  labelPosition="left"
                  basic
                  color="black"
                  onClick={() => {
                    createNotification("info", null, "Feature coming soon !");
                  }}
                ></Button>
                <Button
                  style={{ margin: "0 3px" }}
                  className="my-1 my-lg-0 todo-action-btn todo-delete-btn"
                  content="Delete"
                  labelPosition="left"
                  basic
                  color="red"
                  icon="trash"
                  id={`deleteBtn-${todo.id}`}
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
