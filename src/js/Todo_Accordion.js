import React, { useState } from "react";
import { Segment, Header } from "semantic-ui-react";
import Chevron from "./Components/Chevron";

// CSS
import "../css/todo-accordion.css";

const Todo_Accordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(setActive === "active" ? "0px" : `${220}px`);
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  const { snumber, id, title, children } = props;

  return (
    <Segment raised className="accordion__section each-todo p-0" id={id}>
      <button
        type="button"
        className={`accordion px-1 ${setActive}`}
        onClick={toggleAccordion}
        style={{ borderRadius: ".29rem" }}
      >
        <Header as="h4" className="m-0 pl-2 pe-5 todo-snumber">
          {snumber}.
        </Header>
        <h4 className="accordion__title my-0">{title}</h4>
        <Chevron
          className={`accordion__icon ${setRotate}`}
          width={10}
          fill={"#444"}
        />
      </button>

      <div className="accordion__content" style={{ maxHeight: `${setHeight}` }}>
        <div className="px-3 py-2 accordion_content_container">{children}</div>
      </div>
    </Segment>
  );
};
export default Todo_Accordion;
