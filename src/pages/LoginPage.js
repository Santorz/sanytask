import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";
import { Container, Segment } from "semantic-ui-react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login | my-next-task";
  }, []);
  return (
    <>
      <MainNav isMainPageNav={false} />
      <Container fluid className="mx-auto mt-3">
        <Segment></Segment>
      </Container>
    </>
  );
};

export default LoginPage;
