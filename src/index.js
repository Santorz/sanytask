import React, { useEffect, useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import {
  Redirect,
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './pages/Home';
import Dashboard from './dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './pages/404-page';
// import { setIntervalAsync } from './utils/customSchedulers';
import { useCheckUserStatus } from './parse-sdk/actions';
import { useLocalstorageState } from 'rooks';
import { useMediaQuery } from 'react-responsive';
import useDarkMode from 'use-dark-mode';

// Parse SDK
// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from './parse-sdk/config';
// import { isLocalUserPresentFunc } from './parse-sdk/userVars';

// CSS
import 'semantic-ui-css/semantic.min.css';
import './css/bootstrap-utilities.min.css';
import './css/index.css';
import './css/cust-utils.css';

export const DarkThemeContext = createContext(null);

// Main Component
const MainBodyContainer = () => {
  // Hooks
  const [isLoggedIn] = useCheckUserStatus();
  const [darkThemeVar] = useLocalstorageState('darkTheme');
  const systemPrefersDark = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
    undefined,
  });
  const darkThemeObject = useDarkMode(
    typeof darkThemeVar === 'boolean' ? darkThemeVar : systemPrefersDark,
    {
      onChange: () => {
        document.body.setAttribute('darkTheme', darkThemeObject.value);
      },
    }
  );
  // useEffects
  // Initialize Parse
  useEffect(() => {
    if (!Parse.applicationId) {
      Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
      Parse.serverURL = PARSE_HOST_URL;
    }
  }, []);

  // State values
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);

  // UseEffect for checking and resetting login stats
  React.useEffect(() => {
    setIsUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <DarkThemeContext.Provider
      value={{
        isDarkTheme: darkThemeObject.value,
        darkThemeToggle: darkThemeObject.toggle,
      }}
    >
      {/* router setup */}
      <Router hashType='noslash'>
        <Switch>
          <Route exact path='/'>
            <Helmet>
              <title>Organize your tasks with ease | my-next-task</title>
            </Helmet>
            <Home />
          </Route>

          {/* Route path for dashboard*/}
          <Route path='/dashboard'>
            {isUserLoggedIn && (
              <>
                <Helmet>
                  <title>Dashboard | my-next-task</title>
                </Helmet>
                <Dashboard />
              </>
            )}
            {!isUserLoggedIn && <Redirect to='/login?src=dashboard' />}
          </Route>
          {/* end of dashboard route path */}

          {/* Route Path for login */}
          <Route path='/login'>
            {isUserLoggedIn ? (
              <Redirect to='/dashboard' />
            ) : (
              <>
                <Helmet>
                  <title>Login | my-next-task</title>
                </Helmet>
                <LoginPage />
              </>
            )}
          </Route>
          {/* end of login route path */}

          {/* Route path for signup page*/}
          <Route path='/signup'>
            {isUserLoggedIn ? (
              <Redirect to='/dashboard' />
            ) : (
              <>
                <Helmet>
                  <title>Sign up for an account | my-next-task</title>
                </Helmet>
                <SignupPage />
              </>
            )}
          </Route>
          {/* end of signup route path */}

          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
      {/* end of router setup */}
    </DarkThemeContext.Provider>
  );
};

ReactDOM.render(<MainBodyContainer />, document.getElementById('root'));
