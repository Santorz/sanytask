import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { data } from "./data";

// CSS
import "semantic-ui-css/semantic.min.css";
// import "animate.css";
import "./index.css";

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
    <div id="todos-container">
      {todos.map((todo, index) => {
        const { id, text } = todo;
        return (
          <Segment className="each-todo d-flex-row" key={id} id={"todo-" + id}>
            <h4 style={{ margin: "0" }} className="todo-sn">
              {index + 1}.
            </h4>
            <h4
              style={{ margin: "0", textAlign: "center" }}
              className="todo-text"
            >
              {text}
            </h4>
            <div>
              <Button
                style={{ margin: "0 3px" }}
                className="todo-done-btn"
                basic
                color="green"
                icon="check"
                onClick={() => {
                  markTodoAsDone(id);
                }}
              ></Button>
              <Button
                style={{ margin: "0 3px" }}
                className="todo-delete-btn"
                basic
                color="red"
                icon="trash"
                onClick={() => {
                  deleteTodo(id);
                }}
              ></Button>
            </div>
          </Segment>
        );
      })}
    </div>
  );
};

export default Todos;
