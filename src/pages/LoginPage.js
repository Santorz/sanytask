import React, { useEffect, useState } from "react";
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
import { emailRegex, passwordRegex } from "../utils/regexValidator";

// CSS
import "../css/login-page.css";

const LoginPage = () => {
  // useStates
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userPasswordValue, setUserPasswordValue] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  // UseEffect for document title
  useEffect(() => {
    document.title = "Login | my-next-task";
  }, []);

  //Validate each input
  const validateEachInput = (fieldValue, respectiveRegex, setIsInvalidBool) => {
    if (!fieldValue.match(respectiveRegex)) {
      //If regex doesn't match
      setIsInvalidBool(true);
    }
  };

  // Process Login Input Final
  const processLoginInputFinal = (e) => {
    e.preventDefault();

    // Check if both field match the regexes
    if (
      userEmailValue.match(emailRegex) &&
      userPasswordValue.match(passwordRegex)
    ) {
      alert("Correct detils, fully validated");
      // Perform the main submission
    }

    // Check if both didn't match
    else if (
      !userEmailValue.match(emailRegex) &&
      !userPasswordValue.match(passwordRegex)
    ) {
      setIsEmailInvalid(true);
      setIsPasswordInvalid(true);
    }

    // Check if it's only email that didn't match
    else if (!userEmailValue.match(emailRegex)) {
      setIsEmailInvalid(true);
    }

    // Check if it's only paswword that didn't match
    else if (!userPasswordValue.match(passwordRegex)) {
      setIsPasswordInvalid(true);
    }
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
            tablet={8}
            computer={6}
            largeScreen={5}
            widescreen={5}
          >
            <Segment raised padded id="login-div" className="mt-3">
              <h3 className="open-sans-font text-teal d-inline">
                Login to Dashboard
              </h3>
              <Form
                id="login-form"
                className="mt-3"
                onSubmit={processLoginInputFinal}
              >
                <Form.Field className="mb-1">
                  <label htmlFor="emailField" className="login-form-label">
                    Email:
                  </label>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    type="email"
                    name="emailField"
                    id="emailField"
                    placeholder="Enter email address..."
                    value={userEmailValue}
                    onChange={(e) => setUserEmailValue(e.target.value)}
                    onFocus={() => isEmailInvalid && setIsEmailInvalid(false)}
                    onBlur={(e) =>
                      validateEachInput(
                        userEmailValue,
                        emailRegex,
                        setIsEmailInvalid
                      )
                    }
                  />
                </Form.Field>
                <p
                  className={`my-0 login-page-email-error-text ${
                    isEmailInvalid && "error-message-visible"
                  }`}
                >
                  Empty or invalid email.
                </p>
                <Form.Field className="mb-1">
                  <label htmlFor="passwordField" className="login-form-label">
                    Password:
                  </label>
                  <Input
                    type="password"
                    name="passwordField"
                    id="passwordField"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Enter password..."
                    value={userPasswordValue}
                    onChange={(e) => setUserPasswordValue(e.target.value)}
                    onFocus={() =>
                      isPasswordInvalid && setIsPasswordInvalid(false)
                    }
                    onBlur={(e) =>
                      validateEachInput(
                        userPasswordValue,
                        passwordRegex,
                        setIsPasswordInvalid
                      )
                    }
                  />
                </Form.Field>
                {isPasswordInvalid && (
                  <p
                    className={`my-0 login-page-password-error-text ${
                      isPasswordInvalid && "error-message-visible"
                    }`}
                  >
                    Password must at least be 8 chars long, have one or more
                    UPPERCASE letter and symbol (* , !).
                  </p>
                )}
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
