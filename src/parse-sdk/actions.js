import { useState, useEffect, useCallback } from 'react';
import Parse from 'parse/dist/parse.min.js';
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from '../parse-sdk/config';
import { isLocalUserPresentFunc, getCurrentLocalUser } from './userVars';
import { setIntervalAsync } from '../utils/customSchedulers';
import { isEqual } from 'lodash';

// Sign up Func
export const registerNewUser = async function (
  firstName,
  lastName,
  email,
  password
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
export const loginUserIn = async function (username, password) {
  // Note that these values come from state variables that we've declared before
  const usernameValue = username;
  const passwordValue = password;
  try {
    // logIn returns the corresponding ParseUser object
    const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
    Parse.Session.current()
      .then((session) => {
        if (isLocalUserPresentFunc()) {
          localStorage.setItem(
            'sessionExpDate',
            session.attributes.expiresAt.toUTCString()
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
    return {
      status: 'success',
      result: loggedInUser,
    };
  } catch (error) {
    // Error can be caused by wrong parameters or lack of Internet connection
    return {
      status: 'failure',
      result: error.message,
    };
  }
};

export const invokeSignOut = async () => {
  localStorage.removeItem('sessionExpDate');
  // window.history.pushState('', '', '/#');
  await Parse.User.logOut();
};

// Hook to return user logged in staus and user object
export const useCheckUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLocalUserPresentFunc());
  const [localUser, setLocalUser] = useState(getCurrentLocalUser());

  const refreshStatus = useCallback(async () => {
    !(isLoggedIn && isLocalUserPresentFunc()) &&
      setIsLoggedIn(isLocalUserPresentFunc());
    !isEqual(localUser, getCurrentLocalUser()) &&
      setLocalUser(getCurrentLocalUser());
    let sessionExpDate = localStorage.getItem('sessionExpDate');
    if (sessionExpDate && Date.now() > new Date(sessionExpDate)) {
      await invokeSignOut();
    } /*else if (
      !sessionExpDate &&
      getCurrentLocalUser() !== null &&
      getCurrentLocalUser() !== undefined
    ) {
      await invokeSignOut();
    } else if (
    sessionExpDate &&
    (getCurrentLocalUser() === null || getCurrentLocalUser() === undefined)
  ) {
    invokeSignOut();
  }*/
  }, [isLoggedIn, localUser]);
  useEffect(() => {
    setIntervalAsync(refreshStatus, 2000);
  }, [refreshStatus]);

  return [isLoggedIn, localUser];
};

// Hook to fetch tasks
export const useFetchRemoteTasks = () => {
  const [tasksLoading, setTasksLoading] = useState(true);
  const [usersTasks, setUsersTasks] = useState(null);
  const [isTasksFetchErr, setIsTasksFetchErr] = useState(false);
  const [fetchErrMsg, setFetchErrMsg] = useState('');

  const performFreshFetch = () => {
    localStorage.removeItem('usersTasks');
    setTasksLoading(true);
    setUsersTasks(null);
    setIsTasksFetchErr(false);
    setFetchErrMsg('');
    const parseQuery = new Parse.Query('Task');
    parseQuery
      .equalTo('user', Parse.User.current())
      .find()
      .then((data) => {
        data.sort((a, b) => {
          let da = new Date(a.attributes.dueDate);
          let db = new Date(b.attributes.dueDate);
          if (da > db) {
            return 1;
          } else {
            return -1;
          }
        });
        localStorage.setItem('usersTasks', JSON.stringify(data));
        setUsersTasks(
          Array.from(JSON.parse(localStorage.getItem('usersTasks')))
        );
        setTasksLoading(false);
      })
      .catch((error) => {
        setFetchErrMsg(error.message);
        setTasksLoading(false);
        setIsTasksFetchErr(true);
      });
  };

  useEffect(() => {
    if (!Parse.applicationId) {
      Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
      Parse.serverURL = PARSE_HOST_URL;
    }
  }, []);

  const updateTasks = useCallback((isFreshPageLoad) => {
    const isOfflineAvailable =
      localStorage.getItem('usersTasks') !== null &&
      localStorage.getItem('usersTasks') !== undefined;
    if (
      (isFreshPageLoad && isOfflineAvailable) ||
      (isFreshPageLoad && !isOfflineAvailable)
    ) {
      performFreshFetch();
    } else if (!isFreshPageLoad && isOfflineAvailable) {
      setTasksLoading(false);
      setIsTasksFetchErr(false);
      setFetchErrMsg('');
      setUsersTasks(JSON.parse(localStorage.getItem('usersTasks')));
    } else if (!isFreshPageLoad && !isOfflineAvailable) {
      performFreshFetch();
    }
  }, []);

  return {
    tasksLoading,
    usersTasks,
    isTasksFetchErr,
    fetchErrMsg,
    updateTasks,
  };
};
