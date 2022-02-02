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
import { emailRegex, passwordRegex, nameRegex } from "../utils/regexValidator";
import { registerNewUser } from "../parse-sdk/actions";

// CSS
import "../css/signup-page.css";

const SignupPage = () => {
  // Refs
  const signUpFormRef = useRef(null);
  // useStates
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [userEmailValue, setUserEmailValue] = useState("");
  const [firstPasswordValue, setFirstPasswordValue] = useState("");
  const [secondPasswordValue, setSecondPasswordValue] = useState("");
  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [secondPasswordDoesNotMatch, setSecondPasswordDoesNotMatch] =
    useState(false);
  const [mainSubmissionStarted, setMainSubmissionStarted] = useState(false);
  const [isSubmissionFailure, setIsSubmissionFailure] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failureMsg, setFailureMsg] = useState("");

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

  // Process Sign up input final
  const processSignupInputFinal = (e) => {
    e.preventDefault();
    if (!firstNameValue.match(nameRegex)) {
      setIsFirstNameInvalid(true);
    } else if (!lastNameValue.match(nameRegex)) {
      setIsLastNameInvalid(true);
    } else if (!userEmailValue.match(emailRegex)) {
      setIsEmailInvalid(true);
    } else if (!firstPasswordValue.match(passwordRegex)) {
      setIsPasswordInvalid(true);
    } else if (secondPasswordValue !== firstPasswordValue) {
      setSecondPasswordDoesNotMatch(true);
    } else {
      // Do main submission
      setMainSubmissionStarted(true);
      registerNewUser(
        firstNameValue,
        lastNameValue,
        userEmailValue,
        secondPasswordValue
      )
        .then((resp) => {
          if (resp.status === "success") {
            setIsSubmissionSuccess(true);
            setSuccessMsg(resp.message);
          } else if (resp.status === "failure") {
            setIsSubmissionFailure(true);
            setFailureMsg(resp.message);
          }
        })
        .catch((err) => {
          setIsSubmissionFailure(true);
          setFailureMsg(err.message);
        });
    }
    //
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
          id="signup-page-body"
        >
          <Grid.Column
            mobile={15}
            tablet={8}
            computer={6}
            largeScreen={5}
            widescreen={5}
          >
            <Segment raised padded id="signup-div" className="mt-0">
              {/* Submission process dimmer */}
              {mainSubmissionStarted && (
                <Dimmer active style={{ backdropFilter: "blur(4px)" }}>
                  {!isSubmissionSuccess && !isSubmissionFailure && (
                    <Loader size="big" className="rounded">
                      <h3 className="open-sans-font">
                        Registration in Progress...
                      </h3>
                    </Loader>
                  )}
                  {!isSubmissionFailure && isSubmissionSuccess && (
                    <>
                      <Icon name="check circle outline" size="huge"></Icon>
                      <h3
                        style={{ fontWeight: "normal" }}
                        className="pb-0 mb-1`"
                      >
                        Sign up successful. <br /> Please check your inbox for a
                        link to verify your email.
                      </h3>
                      <h5 className="mt-1 pb-1">{successMsg}</h5>
                      <Link to="/" id="signup-success-btn" className="rounded">
                        Okay, got it.
                      </Link>
                    </>
                  )}
                  {isSubmissionFailure && !isSubmissionSuccess && (
                    <>
                      <Icon name="warning sign" size="huge"></Icon>
                      <h3
                        style={{ fontWeight: "normal" }}
                        className="pb-0 mb-1`"
                      >
                        An error occurred while trying to sign up.
                      </h3>
                      <h5 className="mt-1 pb-1">{failureMsg}</h5>

                      <Button
                        inverted
                        onClick={() => {
                          setIsSubmissionFailure(false);
                          signUpFormRef.current.dispatchEvent(
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
                        onClick={() => setMainSubmissionStarted(false)}
                      >
                        <Icon name="close"></Icon>
                        Close
                      </Button>
                    </>
                  )}
                </Dimmer>
              )}
              <h3 className="open-sans-font text-teal d-inline">
                Sign up to access features
              </h3>
              {/* The form itself */}
              <Ref innerRef={signUpFormRef}>
                <Form
                  id="signup-form"
                  className="mt-3"
                  onSubmit={processSignupInputFinal}
                >
                  <Form.Field className="mb-0">
                    <label
                      htmlFor="firstNameField"
                      className="signup-form-label"
                    >
                      First Name:
                    </label>
                    <Input
                      icon="user"
                      iconPosition="left"
                      type="text"
                      name="firstNameField"
                      id="firstNameField"
                      placeholder="Enter your first name..."
                      value={firstNameValue}
                      onChange={(e) => setFirstNameValue(e.target.value)}
                      onFocus={() =>
                        isFirstNameInvalid && setIsFirstNameInvalid(false)
                      }
                      onBlur={() =>
                        validateEachInput(
                          firstNameValue,
                          nameRegex,
                          isFirstNameInvalid,
                          setIsFirstNameInvalid
                        )
                      }
                    />
                    <p
                      className={`my-0 signup-page-error-text ${
                        isFirstNameInvalid && "error-message-visible"
                      }`}
                    >
                      First name must be 3 letters or more.
                    </p>
                  </Form.Field>

                  <Form.Field className="mb-0">
                    <label
                      htmlFor="lastNameField"
                      className="signup-form-label"
                    >
                      Last Name:
                    </label>
                    <Input
                      icon="user"
                      iconPosition="left"
                      type="text"
                      name="lastNameField"
                      id="lastNameField"
                      placeholder="Enter your last name..."
                      value={lastNameValue}
                      onChange={(e) => setLastNameValue(e.target.value)}
                      onFocus={() =>
                        isLastNameInvalid && setIsLastNameInvalid(false)
                      }
                      onBlur={() =>
                        validateEachInput(
                          lastNameValue,
                          nameRegex,
                          isLastNameInvalid,
                          setIsLastNameInvalid
                        )
                      }
                    />
                    <p
                      className={`my-0 signup-page-error-text ${
                        isLastNameInvalid && "error-message-visible"
                      }`}
                    >
                      Last name must be 3 letters or more.
                    </p>
                  </Form.Field>

                  <Form.Field className="mb-0">
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
                      value={userEmailValue}
                      onChange={(e) => setUserEmailValue(e.target.value)}
                      onFocus={() => isEmailInvalid && setIsEmailInvalid(false)}
                      onBlur={() =>
                        validateEachInput(
                          userEmailValue,
                          emailRegex,
                          isEmailInvalid,
                          setIsEmailInvalid
                        )
                      }
                    />
                    <p
                      className={`my-0 signup-page-error-text ${
                        isEmailInvalid && "error-message-visible"
                      }`}
                    >
                      Empty or invalid email.
                    </p>
                  </Form.Field>

                  <Form.Field className="mb-0">
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
                      value={firstPasswordValue}
                      onChange={(e) => setFirstPasswordValue(e.target.value)}
                      onFocus={() =>
                        isPasswordInvalid && setIsPasswordInvalid(false)
                      }
                      onBlur={() =>
                        validateEachInput(
                          firstPasswordValue,
                          passwordRegex,
                          isPasswordInvalid,
                          setIsPasswordInvalid
                        )
                      }
                    />
                    <p
                      className={`my-0 signup-page-error-text ${
                        isPasswordInvalid && "error-message-visible"
                      }`}
                    >
                      Password must at least be 8 chars long, have one or more
                      UPPERCASE letter and symbol (* , !).
                    </p>
                  </Form.Field>

                  <Form.Field className="mb-0">
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
                      value={secondPasswordValue}
                      onChange={(e) => setSecondPasswordValue(e.target.value)}
                      onFocus={() =>
                        secondPasswordDoesNotMatch &&
                        setSecondPasswordDoesNotMatch(false)
                      }
                      onBlur={(e) => {
                        if (e.target.value !== firstPasswordValue) {
                          setSecondPasswordDoesNotMatch(true);
                        }
                      }}
                    />
                    <p
                      className={`my-0 signup-page-error-text ${
                        secondPasswordDoesNotMatch && "error-message-visible"
                      }`}
                    >
                      Password doesn't match the first one.
                    </p>
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
                  {/*  */}
                </Form>
              </Ref>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default SignupPage;
