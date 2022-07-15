import Parse from 'parse';
import {
  PARSE_APPLICATION_ID,
  PARSE_HOST_URL,
  PARSE_JAVASCRIPT_KEY,
} from './config';
import { isLocalUserPresentFunc } from './userVars';

// Sign up Func
export const registerNewUser = async function (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  // Note that these values come from state variables that we've declared before
  const emailValue = email;
  const passwordValue = password;
  const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  try {
    // Since the signUp method returns a Promise, we need to call it using await
    const createdUser = await Parse.User.signUp(emailValue, passwordValue, {
      email: emailValue,
      firstName: fName,
      lastName: lName,
    });
    // Auto-logout
    Parse.User.logOut();
    // When successful
    return {
      status: 'success',
      message: `Email: ${createdUser.getUsername()} was successfully registered.`,
    };
  } catch (error) {
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    return {
      status: 'failure',
      message: `Error! ${error}`,
    };
  }
};

// Login Func
export const logUserIn = async (username: string, password: string) => {
  // Note that these values come from state variables that we've declared before
  const usernameValue = username;
  const passwordValue = password;

  try {
    // logIn returns the corresponding ParseUser object
    const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
    return {
      status: 'success',
      result: loggedInUser,
    };
  } catch (error: Error | any) {
    // Error can be caused by wrong parameters or lack of Internet connection
    console.log(error);
    return {
      status: 'failure',
      result: error.message,
    };
  }
};

// Get userLoggedInStatus
export const getUserLoggedInStatus = () => {
  return isLocalUserPresentFunc();
};

export const logUserOut = async () => {
  await Parse.User.logOut();
};

export const getCurrentSession = async () => {};
