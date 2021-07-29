import React, { useState } from "react";
import {
  Container,
  Header,
  Grid,
  // Segment,
  Button,
  Form,
} from "semantic-ui-react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import CustMaterialTheme from "./custDateTimePickerTheme";
// import { data } from "../data";
import { PlusSquare } from "react-feather";

// CSS
import "../../css/new-todo-form.css";

const NewTodoForm = () => {
  // Variables relating to date
  const [dueDateVal, setDueDateVal] = useState(
    new Date().getTime() + 5 * 60000
  );

  /*UseEffect to update time input
  useEffect(() => {
    let interval = setInterval(() => {
      setDueDateVal(new Date(new Date().getTime() + 10 * 60000));
    }, 1000);
    return () => clearInterval(interval);
  }); */

  // Variables relating to to-do
  const originalTodoObjFormat = {
    dateCreated: "",
    dueDate: "",
    id: null,
    todoDescription: "",
    todoHeading: "",
  };
  const [newTodoObj, setNewTodoObj] = useState(originalTodoObjFormat);
  // const [allTodos, setAllTodos] = useState(data);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if due date is equal or less than presnt dtae and time
    if (new Date(dueDateVal) < new Date(new Date().getTime() + 2 * 60000)) {
      alert(
        "Update due date to at least two minutes from current date and time "
      );
    } else {
      newTodoObj.dueDate = dueDateVal.toString();
      console.log(newTodoObj);
      // setAllTodos({ ...allTodos, newTodoObj})
      // After everything, reset form
      setDueDateVal(new Date().getTime() + 5 * 60000);
      setNewTodoObj(originalTodoObjFormat);
    }
  };

  return (
    <Container fluid className="px-0 px-sm-2 mx-0 mt-2 mt-md-4">
      <Header
        as="h2"
        className="d-flex mx-auto align-items-center justify-content-center"
        textAlign="center"
        style={{ color: "white", userSelect: "none" }}
      >
        Create new to-do &nbsp;&nbsp;
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
          <Form id="newTodoForm" className="px-2 py-3" onSubmit={handleSubmit}>
            <Form.Field>
              <label className="ps-2 todo-form-label" htmlFor="todoHeading">
                to-do header:
              </label>
              <input
                type="text"
                name="todoHeading"
                id="todoHeading"
                placeholder="Enter a brief header..."
                required={true}
                maxLength={40}
                value={newTodoObj.todoHeading}
                onChange={handleChange}
              />
            </Form.Field>

            <Form.Field>
              <label className="ps-2 todo-form-label" htmlFor="todoDescription">
                description:
              </label>
              <textarea
                name="todoDescription"
                id="todoDescription"
                rows="5"
                required={true}
                placeholder="Enter to-do description..."
                value={newTodoObj.todoDescription}
                onChange={handleChange}
              ></textarea>
            </Form.Field>

            {/* Due date Input Field */}
            <Form.Field>
              <label className="ps-2 todo-form-label">due date:</label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={CustMaterialTheme}>
                  <DateTimePicker
                    label="DateTimePicker"
                    inputVariant="outlined"
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

            <div className="pb-2 px-1 d-flex justify-content-around">
              <Button
                basic
                type="button"
                color="red"
                onClick={() => {
                  let closeConfirmation = window.confirm(
                    "Sure you want to cancel?"
                  );
                  if (closeConfirmation) {
                    window._closeNewTodoModal_();
                  }
                }}
              >
                Cancel
              </Button>
              <Button basic color="blue" type="button">
                Save as draft
              </Button>
              <Button basic color="green" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default NewTodoForm;
