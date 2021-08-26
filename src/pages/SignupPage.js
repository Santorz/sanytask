import React from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import { ArrowRightCircle } from "react-feather";

import {
  Container,
  Grid,
  Segment,
  Form,
  Button,
  Input,
} from "semantic-ui-react";

// CSS
import "../css/signup-page.css";

const SignupPage = () => {
  return (
    <>
      <MainNav isMainPageNav={false} />
      <Container fluid className="mx-auto mt-3">
        <Grid
          textAlign="center"
          stackable
          padded
          verticalAlign="middle"
          id="signup-page-body"
        >
          <Grid.Column
            mobile={15}
            tablet={8}
            computer={6}
            largeScreen={5}
            widescreen={5}
          >
            <Segment raised padded id="signup-div" className="mt-3">
              <h3 className="open-sans-font text-teal d-inline">
                Sign up to access features
              </h3>
              <Form
                id="signup-form"
                className="mt-3"
                // onSubmit={processSignupInputFinal}
              >
                <Form.Field className="mb-1">
                  <label htmlFor="firstNameField" className="signup-form-label">
                    First Name:
                  </label>
                  <Input
                    icon="user"
                    iconPosition="left"
                    type="text"
                    name="firstNameField"
                    id="firstNameField"
                    placeholder="Enter your first name..."
                  />
                </Form.Field>

                <Form.Field className="mb-1">
                  <label htmlFor="lastNameField" className="signup-form-label">
                    Last Name:
                  </label>
                  <Input
                    icon="user"
                    iconPosition="left"
                    type="text"
                    name="lastNameField"
                    id="lastNameField"
                    placeholder="Enter your last name..."
                  />
                </Form.Field>

                <Form.Field className="mb-1">
                  <label htmlFor="emailField" className="signup-form-label">
                    Email:
                  </label>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    type="email"
                    name="emailField"
                    id="emailField"
                    placeholder="Enter email address..."
                    // value={userEmailValue}
                    // onChange={(e) => setUserEmailValue(e.target.value)}
                    // onFocus={() => isEmailInvalid && setIsEmailInvalid(false)}
                    /* onBlur={(e) =>
                      validateEachInput(
                        userEmailValue,
                        emailRegex,
                        isEmailInvalid,
                        setIsEmailInvalid
                      )
                    } */
                  />
                </Form.Field>

                <Form.Field>
                  <label
                    htmlFor="firstPasswordField"
                    className="signup-form-label"
                  >
                    Password
                  </label>
                  <Input
                    icon="key"
                    iconPosition="left"
                    type="password"
                    name="firstPasswordField"
                    id="firstPasswordField"
                    placeholder="Enter your password..."
                  />
                </Form.Field>

                <Form.Field>
                  <label
                    htmlFor="secondPasswordField"
                    className="signup-form-label"
                  >
                    Repeat Password
                  </label>
                  <Input
                    icon="lock"
                    iconPosition="left"
                    type="password"
                    name="secondPasswordField"
                    id="secondPasswordField"
                    placeholder="Enter password again..."
                  />
                </Form.Field>

                <div className="d-flex pt-2 pb-4 justify-content-center align-items-center">
                  <h4 className="form-alt-links d-inline my-0 py-0">
                    <Link to="/login" className="text-teal">
                      Have an account already? Login instead.
                    </Link>
                  </h4>
                </div>

                <Form.Field>
                  <Button
                    type="submit"
                    id="signup-btn-main"
                    className="d-flex align-items-center mx-auto"
                  >
                    Sign up <ArrowRightCircle size="20" className="ms-1" />
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

export default SignupPage;
