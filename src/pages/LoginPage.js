import React, { useState, useRef } from "react";
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
  Dimmer,
  Loader,
  Icon,
  Ref,
} from "semantic-ui-react";
import { emailRegex, passwordRegex } from "../utils/regexValidator";
import { PARSE_APPLICATION_ID } from "../parse-sdk/config";
import { loginUserIn } from "../parse-sdk/actions";
import {
  //   getCurrentLoggedInUser,
  checkIfUserIsLoggedIn,
} from "../parse-sdk/userVars";

// CSS
import "../css/login-page.css";

const LoginPage = () => {
  // UseEffects
  React.useEffect(() => {
    checkIfUserIsLoggedIn().then((resp) => {
      if (resp === true) {
        window.history.pushState(null, "dashboard");
      }
    });
  }, []);

  // useStates
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userPasswordValue, setUserPasswordValue] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [loginStarted, setLoginStarted] = useState(false);
  const [loginSucess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  // UseRefs
  const loginFormRef = useRef(null);

  //Validate each input
  const validateEachInput = (
    fieldValue,
    respectiveRegex,
    isInvalidBool,
    setIsInvalidBool
  ) => {
    if (!isInvalidBool) {
      if (!fieldValue.match(respectiveRegex)) {
        //If regex doesn't match
        setIsInvalidBool(true);
      }
    }
  };

  // Process Login Input Final
  const processLoginInputFinal = async (e) => {
    e.preventDefault();

    // Check if both field match the regexes
    if (
      userEmailValue.match(emailRegex) &&
      userPasswordValue.match(passwordRegex)
    ) {
      // Perform manual logout first of all
      localStorage.removeItem(`Parse/${PARSE_APPLICATION_ID}/currentUser`);

      // Perform main login action
      setLoginStarted(true);
      loginUserIn(userEmailValue, userPasswordValue)
        .then((resp) => {
          if (resp.status === "success") {
            setLoginSuccess(true);
          } else if (resp.status === "failure") {
            setLoginFailed(true);
          }
        })
        .catch((err) => {
          setLoginFailed(true);
        });
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
              {loginStarted && (
                <Dimmer active style={{ backdropFilter: "blur(4px)" }}>
                  {!loginSucess && !loginFailed && (
                    <Loader>
                      <h3>Logging you in...</h3>
                    </Loader>
                  )}
                  {loginSucess && !loginFailed && (
                    <>
                      <Icon size="huge" name="check"></Icon>
                      <h3>You've successfully logged in</h3>
                      <Link
                        id="signin-success-redir-link"
                        className="rounded px-3 py-2"
                        to="/"
                      >
                        Okay, got it.
                      </Link>
                    </>
                  )}
                  {!loginSucess && loginFailed && (
                    <>
                      <Icon size="huge" name="warning"></Icon>
                      <h3>Oops... something went wrong.</h3>
                      <Button
                        inverted
                        onClick={() => {
                          setLoginFailed(false);
                          loginFormRef.current.dispatchEvent(
                            new Event("submit", {
                              cancellable: true,
                              bubbles: true,
                            })
                          );
                        }}
                      >
                        <Icon name="refresh"></Icon>
                        Retry
                      </Button>
                      <Button
                        inverted
                        onClick={() => {
                          setLoginStarted(false);
                          setLoginFailed(false);
                        }}
                      >
                        <Icon name="close"></Icon>
                        Cancel
                      </Button>
                    </>
                  )}
                </Dimmer>
              )}
              <h3 className="open-sans-font text-teal d-inline">
                Login to Dashboard
              </h3>
              <Ref innerRef={loginFormRef}>
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
                          isEmailInvalid,
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
                          isPasswordInvalid,
                          setIsPasswordInvalid
                        )
                      }
                    />
                  </Form.Field>
                  <p
                    className={`my-0 login-page-password-error-text ${
                      isPasswordInvalid && "error-message-visible"
                    }`}
                  >
                    Password must at least be 8 chars long, have one or more
                    UPPERCASE letter and symbol (* , !).
                  </p>

                  <div className="d-flex py-4 justify-content-between align-items-center">
                    <h4 className="form-alt-links d-inline my-0 py-0">
                      <Link to="/forgot-password" className="text-teal">
                        Forgot Password?
                      </Link>
                    </h4>
                    <h4 className="form-alt-links d-inline my-0 py-0">
                      <Link to="/signup" className="text-teal">
                        Sign up instead
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
              </Ref>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
