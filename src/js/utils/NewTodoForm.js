import React from "react";
import { Container, Header } from "semantic-ui-react";
import { PlusSquare } from "react-feather";

const NewTodoForm = () => {
  return (
    <Container fluid>
      <Header
        as="h2"
        className="d-flex mx-auto align-items-center justify-content-center"
        textAlign="center"
        style={{ color: "white", userSelect: "none" }}
      >
        Create new to-do &nbsp;&nbsp;
        <PlusSquare color="white" />
      </Header>
    </Container>
  );
};

export default NewTodoForm;
