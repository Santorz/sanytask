import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import { ArrowRightCircle } from "react-feather";
import { Container, Grid, Segment, Form, Button } from "semantic-ui-react";

// CSS
import "../css/login-page.css";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login | my-next-task";
  }, []);

  // Process Login Input
  const processLoginInput = (e) => {
    console.log(e);
  };

  return (
    <>
      <MainNav isMainPageNav={false} />
      <Container fluid className="mx-auto mt-3">
        <Grid
          textAlign="center"
          stackable
          padded
          verticalAlign="middle"
          id="login-page-body"
        >
          <Grid.Column
            mobile={15}
            tablet={10}
            computer={7}
            largeScreen={6}
            widescreen={5}
          >
            <Segment raised padded id="login-div" className="mt-3">
              <h3 className="open-sans-font text-teal d-inline">
                Login to Dashboard
              </h3>
              <Form
                id="login-form"
                className="mt-3"
                onSubmit={processLoginInput}
              >
                <Form.Field className="mb-1">
                  <label htmlFor="emailField" className="login-form-label">
                    Email:
                  </label>
                  <input type="email" name="emailField" id="emailField" />
                </Form.Field>
                <p className="my-0 login-page-error-text">
                  Enter a valid email format.
                </p>
                <Form.Field className="mb-1">
                  <label htmlFor="passwordField" className="login-form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="passwordField"
                    id="passwordField"
                  />
                </Form.Field>
                <p className="my-0 login-page-error-text">
                  Password must be at least 8 chars long, contain one uppercase
                  letter and one symbol.
                </p>
                <div className="d-flex py-4 justify-content-between align-items-center">
                  <h4 className="form-alt-links d-inline my-0 py-0">
                    <Link to="/forgot-password" className="text-teal">
                      Forgot Password?
                    </Link>
                  </h4>
                  <h4 className="form-alt-links d-inline my-0 py-0">
                    <Link to="/register" className="text-teal">
                      Register an account
                    </Link>
                  </h4>
                </div>
                <Form.Field>
                  <Button
                    type="submit"
                    id="login-btn-main"
                    className="d-flex align-items-center mx-auto"
                  >
                    Login <ArrowRightCircle size="20" className="ms-1" />
                  </Button>
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
