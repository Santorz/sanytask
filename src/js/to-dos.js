import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { data } from "./data";
import TodoAccordion from "./Todo_Accordion";

// CSS
import "semantic-ui-css/semantic.min.css";
// import "animate.css";
import "../css/todos.css";

const Todos = () => {
  const [todos, setTodos] = React.useState(data);

  const deleteTodo = (id) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation === true) {
      let newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const markTodoAsDone = (id) => {
    // Send info to DB
    //Fade element out and delete it
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      {/* This would be displayed if there is more than one task left */}
      {todos.length > 1 && (
        <h4 style={{ margin: "1rem 0", color: "teal" }}>
          You have {todos.length} tasks to complete.
        </h4>
      )}

      {/* This would be displayed if there is only one task left */}
      {todos.length === 1 && (
        <h4 style={{ margin: "1rem 0", color: "teal" }}>
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
            <Icon color="teal" name="calendar check" />
            You're all done...
          </Header>
          <Button color="black">
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
                  fontSize: "1.35rem",
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
                  onClick={() => {
                    markTodoAsDone(id);
                  }}
                ></Button>
                <Button
                  style={{ margin: "0 3px" }}
                  className="my-1 my-lg-0 todo-action-btn todo-edit-btn"
                  icon="pencil"
                  content="Edit"
                  labelPosition="left"
                  basic
                  color="black"
                  onClick={() => {}}
                ></Button>
                <Button
                  style={{ margin: "0 3px" }}
                  className="my-1 my-lg-0 todo-action-btn todo-delete-btn"
                  content="Delete"
                  labelPosition="left"
                  basic
                  color="red"
                  icon="trash"
                  onClick={() => {
                    deleteTodo(id);
                  }}
                ></Button>
              </div>
            </TodoAccordion>
          );
        })}
      </div>
    </>
  );
};

export default Todos;
